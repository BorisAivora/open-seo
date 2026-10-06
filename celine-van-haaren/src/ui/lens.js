import { gsap } from 'gsap';
import { state } from '../core/state.js';

const damp = (current, target, lambda, dt) => current + (target - current) * (1 - Math.exp(-lambda * dt));

// The Lens Reveal. Each [data-lens] figure gets a lens {x, y, r} in its own pixel space.
// Idle, a small lens drifts slowly across the image as an invitation; on hover (or touch-drag)
// it swells and follows the pointer with heavy inertia. The WebGL stage reads the same state;
// without WebGL the CSS clip-path fallback does.
export function initLenses(stage) {
  for (const el of document.querySelectorAll('[data-lens]')) {
    const lens = { x: 0, y: 0, r: 0 };
    const target = { x: 0, y: 0, r: 0 };
    const label = el.querySelector('[data-lens-label]');
    let hovered = false;
    let visible = false;
    let time = Math.random() * 10;
    let rect = el.getBoundingClientRect();

    if (stage) stage.add(el, { lens });

    const fullRadius = () => Math.min(180, rect.width * 0.26);
    const idleRadius = () => Math.min(110, rect.width * 0.16);

    const toLocal = (e) => {
      rect = el.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
    };
    el.addEventListener('pointerenter', (e) => {
      hovered = true;
      toLocal(e);
    });
    el.addEventListener('pointermove', toLocal);
    el.addEventListener('pointerleave', () => (hovered = false));
    el.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') {
        hovered = true;
        toLocal(e);
      }
    });
    el.addEventListener('pointerup', (e) => e.pointerType !== 'mouse' && (hovered = false));
    el.addEventListener('pointercancel', () => (hovered = false));

    new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(el);

    gsap.ticker.add((_t, deltaMs) => {
      if (!visible) return;
      const dt = Math.min(deltaMs / 1000, 0.05);
      rect = el.getBoundingClientRect();
      if (!hovered) {
        time += state.reduced ? 0 : dt;
        target.x = rect.width * (0.5 + 0.3 * Math.cos(time * 0.23));
        target.y = rect.height * (0.5 + 0.22 * Math.sin(time * 0.31));
      }
      target.r = hovered ? fullRadius() : idleRadius();
      if (!lens.r && !lens.x) Object.assign(lens, target, { r: 0 });

      const k = hovered ? 4.2 : 1.6;
      lens.x = damp(lens.x, target.x, k, dt);
      lens.y = damp(lens.y, target.y, k, dt);
      lens.r = damp(lens.r, target.r, 2.4, dt);

      if (!stage) {
        el.style.setProperty('--lx', `${lens.x}px`);
        el.style.setProperty('--ly', `${lens.y}px`);
        el.style.setProperty('--lr', `${lens.r}px`);
      }
      if (label) {
        label.style.opacity = Math.min(1, lens.r / 120);
        label.style.transform = `translate(${rect.left + lens.x}px, ${rect.top + lens.y + lens.r * 0.55}px) translate(-50%, 0)`;
      }
    });
  }
}
