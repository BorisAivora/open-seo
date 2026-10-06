export const planeVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Ping-pong flowmap: every frame the previous field fades a little and the pointer stamps
// its velocity (rg) and strength (b) around its position. Sampled in screen space by images.
export const flowFragment = /* glsl */ `
  uniform sampler2D tMap;
  uniform vec2 uMouse;
  uniform vec2 uVelocity;
  uniform float uAspect;
  uniform float uFalloff;
  uniform float uDissipation;
  varying vec2 vUv;
  void main() {
    vec4 color = texture2D(tMap, vUv) * uDissipation;
    vec2 cursor = vUv - uMouse;
    cursor.x *= uAspect;
    vec3 stamp = vec3(uVelocity, 1.0 - pow(1.0 - min(1.0, length(uVelocity)), 3.0));
    float falloff = smoothstep(uFalloff, 0.0, length(cursor));
    color.rgb = mix(color.rgb, stamp, vec3(falloff));
    gl_FragColor = vec4(color.rgb, 1.0);
  }
`;

const common = /* glsl */ `
  uniform sampler2D uTex;
  uniform vec2 uPlane;
  uniform vec2 uImage;
  uniform float uReveal;
  uniform float uParallax;
  uniform float uWarm;
  varying vec2 vUv;

  // object-fit: cover, plus headroom for parallax and the settling zoom of the reveal.
  vec2 imageUv(vec2 uv) {
    float rp = uPlane.x / uPlane.y;
    float ri = uImage.x / uImage.y;
    vec2 s = rp < ri ? vec2(rp / ri, 1.0) : vec2(1.0, ri / rp);
    float zoom = 1.08 + 0.14 * (1.0 - uReveal);
    uv = (uv - 0.5) * s / zoom + 0.5;
    uv.y += uParallax * 0.03;
    return uv;
  }

  // A curtain rising from the bottom edge with a soft lip.
  float revealMask(vec2 uv) {
    float r = uReveal * 1.08;
    return 1.0 - smoothstep(r - 0.08, r, uv.y);
  }

  // Afternoon and evening light warm the photographs a few percent.
  vec3 grade(vec3 c) {
    return mix(c, c * vec3(1.05, 0.995, 0.9), uWarm);
  }
`;

// THE MATERIAL TEXTURE HOVER: the photo is read through the flowmap as if lying under thick,
// slightly yielding glass — a few pixels of displacement plus a grazing highlight.
export const imageFragment = /* glsl */ `
  ${common}
  uniform sampler2D uFlow;
  uniform vec2 uRes;
  uniform float uHover;

  void main() {
    vec2 uv = imageUv(vUv);
    vec3 flow = texture2D(uFlow, gl_FragCoord.xy / uRes).rgb * uHover;
    vec2 disp = flow.xy * 0.016;
    vec3 col = texture2D(uTex, uv - disp).rgb;

    vec3 n = normalize(vec3(-flow.xy * 0.9, 1.0));
    float spec = pow(max(dot(n, normalize(vec3(-0.45, 0.55, 0.75))), 0.0), 28.0);
    col += vec3(1.0, 0.93, 0.84) * spec * 0.22 * flow.z;
    col *= 1.0 - 0.05 * flow.z;

    float a = revealMask(vUv);
    gl_FragColor = vec4(grade(col) * a, a);
  }
`;

// THE LENS REVEAL: a soft-edged circle that follows the pointer with inertia. Inside it the
// room is shown as it began — a hand-drawn design (edge-detected graphite on chalk paper),
// or a real before-photo when a project provides one. The rim bends the image like glass.
export const lensFragment = /* glsl */ `
  ${common}
  uniform sampler2D uBefore;
  uniform float uMode;
  uniform vec2 uLens;
  uniform float uRadius;

  float lum(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }
  float L(vec2 uv) { return lum(texture2D(uTex, uv).rgb); }
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  vec3 drawing(vec2 uv, vec2 px) {
    // Sobel over a slightly wide kernel so material grain drops out and construction lines stay.
    vec2 e = 2.8 / uImage;
    float tl = L(uv + e * vec2(-1.0, 1.0)), t = L(uv + e * vec2(0.0, 1.0)), tr = L(uv + e * vec2(1.0, 1.0));
    float l = L(uv + e * vec2(-1.0, 0.0)), r = L(uv + e * vec2(1.0, 0.0));
    float bl = L(uv + e * vec2(-1.0, -1.0)), b = L(uv + e * vec2(0.0, -1.0)), br = L(uv + e * vec2(1.0, -1.0));
    float gx = -tl - 2.0 * l - bl + tr + 2.0 * r + br;
    float gy = -tl - 2.0 * t - tr + bl + 2.0 * b + br;
    float edge = smoothstep(0.2, 0.55, length(vec2(gx, gy)));

    vec3 photo = texture2D(uTex, uv).rgb;
    float tone = lum(photo);
    // sparse pencil hatching only in the deepest shadows
    float hatch = smoothstep(0.3, 0.08, tone) * smoothstep(0.86, 0.99, sin((px.x + px.y) * 0.8));
    float ink = clamp(edge * 0.85 + hatch * 0.3, 0.0, 1.0);

    vec2 g = abs(fract(px / 36.0) - 0.5);
    float grid = 1.0 - smoothstep(0.0, 0.02, 0.5 - max(g.x, g.y));

    // a pale watercolour wash: the real materials, with their tones compressed toward paper
    vec3 paper = vec3(0.965, 0.949, 0.925) - hash(floor(px)) * 0.03;
    float value = 0.62 + 0.38 * tone;
    vec3 wash = paper * mix(vec3(value), clamp(photo / max(tone, 0.08), 0.0, 1.6) * value, 0.45);
    paper = mix(wash, vec3(0.612, 0.478, 0.329), grid * 0.12);
    return mix(paper, vec3(0.19, 0.17, 0.155), ink);
  }

  void main() {
    vec2 uv = imageUv(vUv);
    vec3 after = texture2D(uTex, uv).rgb;

    vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uPlane;
    vec2 d = p - uLens;
    float dist = length(d);
    float feather = max(uRadius * 0.09, 1.0);
    float inside = 1.0 - smoothstep(uRadius - feather, uRadius, dist);

    // glass optics: slight magnification, stronger bending toward the rim
    float rim = smoothstep(uRadius - feather * 3.0, uRadius, dist) * inside;
    vec2 bend = (d / max(dist, 1.0)) * rim * 10.0;
    vec2 lp = uLens + d * 0.94 - bend;
    vec2 luv = imageUv(vec2(lp.x / uPlane.x, 1.0 - lp.y / uPlane.y));

    vec3 inner = uMode > 0.5 ? texture2D(uBefore, luv).rgb : drawing(luv, lp);
    vec3 col = mix(grade(after), inner, inside);

    // the lens lifts off the photograph: a soft shadow outside, a hairline of light on the rim
    float halo = smoothstep(uRadius + feather * 2.5, uRadius, dist) * (1.0 - inside);
    col *= 1.0 - halo * 0.16;
    float line = 1.0 - smoothstep(0.0, 1.2, abs(dist - (uRadius - feather * 0.5)));
    col = mix(col, vec3(0.97, 0.95, 0.92), line * 0.35 * step(1.0, uRadius));

    float a = revealMask(vUv);
    gl_FragColor = vec4(col * a, a);
  }
`;
