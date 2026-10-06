// Small shared runtime state. timeOfDay writes the light values, the WebGL stage reads them.
export const state = {
  reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
  finePointer: matchMedia('(hover: hover) and (pointer: fine)').matches,
  lenis: null,
  warm: 0,
  evening: 0,
};
