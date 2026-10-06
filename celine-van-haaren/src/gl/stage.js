import {
  HalfFloatType,
  LinearFilter,
  LinearSRGBColorSpace,
  Mesh,
  NoColorSpace,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  WebGLRenderer,
  WebGLRenderTarget,
} from 'three';
import { gsap } from 'gsap';
import { state } from '../core/state.js';
import { flowFragment, imageFragment, lensFragment, planeVertex } from './shaders.js';

const damp = (current, target, lambda, dt) => current + (target - current) * (1 - Math.exp(-lambda * dt));

// One renderer and one fixed canvas draw every project image on the page. Each image keeps
// its <img> in the DOM (layout, SEO, accessibility, fallback); its plane is synced to the
// element's document position every frame, so it moves exactly with the smooth scroll.
export function createStage(canvas) {
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
  } catch {
    return null;
  }
  if (!renderer.capabilities.isWebGL2) {
    renderer.dispose();
    return null;
  }
  renderer.outputColorSpace = LinearSRGBColorSpace; // pass pixels through untouched, like the <img>
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new OrthographicCamera();
  const geometry = new PlaneGeometry(1, 1);
  const loader = new TextureLoader();
  const items = [];
  const view = { w: 0, h: 0, dpr: 1 };
  let ready = false;
  let wasVisible = true;

  // ── Flowmap (pointer velocity field) ───────────────────────────────────
  const rtOptions = { type: HalfFloatType, minFilter: LinearFilter, magFilter: LinearFilter, depthBuffer: false };
  let flowRead = new WebGLRenderTarget(160, 160, rtOptions);
  let flowWrite = flowRead.clone();
  const flowMaterial = new ShaderMaterial({
    vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy * 2.0, 0.0, 1.0); }`,
    fragmentShader: flowFragment,
    uniforms: {
      tMap: { value: null },
      uMouse: { value: new Vector2(-1, -1) },
      uVelocity: { value: new Vector2() },
      uAspect: { value: 1 },
      uFalloff: { value: 0.16 },
      uDissipation: { value: 0.955 },
    },
    depthTest: false,
  });
  const flowScene = new Scene();
  const flowQuad = new Mesh(geometry, flowMaterial);
  flowQuad.frustumCulled = false;
  flowScene.add(flowQuad);
  const pointer = { x: -1, y: -1, vx: 0, vy: 0, lastX: -1, lastY: -1, active: false };
  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    },
    { passive: true },
  );

  function updateFlow(dt) {
    const u = flowMaterial.uniforms;
    if (pointer.lastX < 0) [pointer.lastX, pointer.lastY] = [pointer.x, pointer.y];
    const ms = Math.max(dt * 1000, 1);
    const tx = (pointer.x - pointer.lastX) / ms;
    const ty = -(pointer.y - pointer.lastY) / ms;
    const moving = tx !== 0 || ty !== 0;
    // heavy inertia: velocity eases in and drains out slowly
    pointer.vx = damp(pointer.vx, tx, moving ? 9 : 4, dt);
    pointer.vy = damp(pointer.vy, ty, moving ? 9 : 4, dt);
    [pointer.lastX, pointer.lastY] = [pointer.x, pointer.y];
    u.uMouse.value.set(pointer.x / view.w, 1 - pointer.y / view.h);
    u.uVelocity.value.set(pointer.vx * 0.6, pointer.vy * 0.6);
    u.tMap.value = flowRead.texture;
    renderer.setRenderTarget(flowWrite);
    renderer.render(flowScene, camera);
    renderer.setRenderTarget(null);
    [flowRead, flowWrite] = [flowWrite, flowRead];
  }

  // ── Items ──────────────────────────────────────────────────────────────
  function measure(item) {
    const r = item.el.getBoundingClientRect();
    item.rect = { top: r.top + window.scrollY, left: r.left + window.scrollX, w: r.width, h: r.height };
    item.mesh.scale.set(r.width, r.height, 1);
    item.uniforms.uPlane.value.set(r.width, r.height);
  }

  function add(el, { lens = null } = {}) {
    const uniforms = {
      uTex: { value: null },
      uPlane: { value: new Vector2(1, 1) },
      uImage: { value: new Vector2(1, 1) },
      uReveal: { value: 0 },
      uParallax: { value: 0 },
      uWarm: { value: 0 },
    };
    if (lens) {
      Object.assign(uniforms, {
        uBefore: { value: null },
        uMode: { value: 0 },
        uLens: { value: new Vector2(-9999, -9999) },
        uRadius: { value: 0 },
      });
    } else {
      Object.assign(uniforms, {
        uFlow: { value: null },
        uRes: { value: new Vector2(1, 1) },
        uHover: { value: 0 },
      });
    }
    const material = new ShaderMaterial({
      vertexShader: planeVertex,
      fragmentShader: lens ? lensFragment : imageFragment,
      uniforms,
      transparent: true,
      premultipliedAlpha: true,
      depthTest: false,
    });
    const mesh = new Mesh(geometry, material);
    mesh.visible = false;
    scene.add(mesh);
    const item = { el, mesh, uniforms, lens, rect: null, loaded: false, revealed: false, hover: 0, hoverTarget: 0 };
    measure(item);
    items.push(item);

    if (!lens && state.finePointer) {
      el.addEventListener('pointerenter', () => (item.hoverTarget = 1));
      el.addEventListener('pointerleave', () => (item.hoverTarget = 0));
    }

    const large = el.dataset.glSrc || el.dataset.lensSrc;
    const small = el.getAttribute('src') ?? el.querySelector('img')?.getAttribute('src');
    const src = lens || item.rect.w * view.dpr > 900 ? large : small;
    const before = lens && el.dataset.lensBefore;
    Promise.all([load(src), before ? load(before) : null]).then(([tex, beforeTex]) => {
      uniforms.uTex.value = tex;
      uniforms.uImage.value.set(tex.image.width, tex.image.height);
      if (beforeTex) {
        uniforms.uBefore.value = beforeTex;
        uniforms.uMode.value = 1;
      }
      item.loaded = true;
      // Already on screen with the page revealed: take over seamlessly instead of re-animating.
      if (ready && inView(item, 0)) {
        uniforms.uReveal.value = 1;
        item.revealed = true;
      }
      el.classList.add('is-gl');
    });
    return item;
  }

  function load(src) {
    return new Promise((resolve) =>
      loader.load(src, (tex) => {
        tex.colorSpace = NoColorSpace;
        tex.generateMipmaps = false;
        tex.minFilter = LinearFilter;
        renderer.initTexture(tex);
        resolve(tex);
      }),
    );
  }

  function inView(item, margin) {
    const top = item.rect.top - window.scrollY;
    return top < view.h + margin && top + item.rect.h > -margin;
  }

  // ── Frame ──────────────────────────────────────────────────────────────
  function resize() {
    view.w = window.innerWidth;
    view.h = window.innerHeight;
    view.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(view.dpr);
    renderer.setSize(view.w, view.h);
    Object.assign(camera, { left: -view.w / 2, right: view.w / 2, top: view.h / 2, bottom: -view.h / 2, near: -10, far: 10 });
    camera.updateProjectionMatrix();
    flowMaterial.uniforms.uAspect.value = view.w / view.h;
    items.forEach(measure);
  }

  function render(_time, deltaMs) {
    const dt = Math.min(deltaMs / 1000, 0.05);
    const scrollY = window.scrollY;
    let visible = 0;

    for (const item of items) {
      const on = item.loaded && inView(item, 120);
      item.mesh.visible = on;
      if (!on) continue;
      visible++;
      const { top, left, w, h } = item.rect;
      const y = top - scrollY;
      item.mesh.position.set(left + w / 2 - view.w / 2, view.h / 2 - (y + h / 2), 0);
      const u = item.uniforms;
      u.uParallax.value = Math.max(-1, Math.min(1, (y + h / 2 - view.h / 2) / view.h));
      u.uWarm.value = state.warm;

      if (!item.revealed && ready && y < view.h * 0.92) {
        item.revealed = true;
        gsap.to(u.uReveal, { value: 1, duration: 2.2, ease: 'expo.out', delay: item.revealDelay ?? 0 });
      }
      if (item.lens) {
        u.uLens.value.set(item.lens.x, item.lens.y);
        u.uRadius.value = item.lens.r;
      } else {
        item.hover = damp(item.hover, item.hoverTarget, 2.2, dt);
        u.uHover.value = item.hover;
        u.uFlow.value = flowRead.texture;
        u.uRes.value.set(view.w * view.dpr, view.h * view.dpr);
      }
    }

    // Nothing on screen: clear once, then idle until an image scrolls back in.
    if (!visible && !wasVisible) return;
    wasVisible = visible > 0;
    if (visible && pointer.active) updateFlow(dt);
    renderer.render(scene, camera);
  }

  resize();
  window.addEventListener('resize', resize);
  new ResizeObserver(() => items.forEach(measure)).observe(document.body);
  document.documentElement.classList.add('has-gl');

  return {
    add,
    render,
    refresh: () => items.forEach(measure),
    // Called after the preloader: images in view start their reveal.
    start() {
      ready = true;
    },
  };
}
