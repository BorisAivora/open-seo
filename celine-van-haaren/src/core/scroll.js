import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { state } from './state.js';

// Heavy, damped smooth scroll. Lenis drives the native scroll position, so ScrollTrigger
// and the WebGL stage keep reading window.scrollY; everything ticks on gsap.ticker.
export function initScroll() {
  if (state.reduced) return;
  const lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.85, touchMultiplier: 1.4 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  state.lenis = lenis;
}

export function scrollTo(target, options = {}) {
  if (state.lenis) state.lenis.scrollTo(target, { duration: 2.2, ...options });
  else if (typeof target === 'number') window.scrollTo({ top: target });
  else document.querySelector(target)?.scrollIntoView();
}
