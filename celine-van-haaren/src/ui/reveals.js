import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { state } from '../core/state.js';

// Scroll reveals. Everything rises slowly from behind a mask — long durations, expo/power
// ease-outs, nothing that snaps.
export function initReveals({ gl }) {
  if (state.reduced) return;

  for (const el of document.querySelectorAll('[data-split]')) {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'line',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.8,
          ease: 'expo.out',
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }),
    });
  }

  gsap.set('[data-reveal]', { y: 28, opacity: 0 });
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 92%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 1.6, ease: 'power3.out', stagger: 0.12 }),
  });

  // The intro statement brightens word by word as it is read.
  for (const el of document.querySelectorAll('[data-words]')) {
    const split = SplitText.create(el, { type: 'words', wordsClass: 'word' });
    gsap.fromTo(
      split.words,
      { opacity: 0.14 },
      { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 40%', scrub: 1.2 } },
    );
  }

  // Without WebGL the images reveal with a clip-path curtain instead of the shader.
  if (!gl) {
    for (const img of document.querySelectorAll('img[data-gl]')) {
      gsap.from(img, {
        clipPath: 'inset(100% 0% 0% 0%)',
        scale: 1.14,
        duration: 2,
        ease: 'expo.out',
        scrollTrigger: { trigger: img, start: 'top 92%', once: true },
      });
    }
  }
}

// First paint after the preloader: headline lines rise, details fade in after them.
export function playIntro() {
  if (state.reduced) {
    gsap.set('[data-hero-title] .hero__line > span', { yPercent: 0, y: 0 });
    gsap.set('[data-hero-fade]', { opacity: 1 });
    return;
  }
  const lines = gsap.utils.toArray('[data-hero-title] .hero__line > span');
  const fades = gsap.utils.toArray('[data-hero-fade]');
  const tl = gsap.timeline();
  if (lines.length) tl.fromTo(lines, { yPercent: 110, y: 0 }, { yPercent: 0, duration: 2, ease: 'expo.out', stagger: 0.14 }, 0.1);
  if (fades.length) tl.fromTo(fades, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.6, ease: 'power3.out', stagger: 0.1 }, 0.7);
}

// The material words drift sideways, a touch faster while the page is being scrolled.
export function initMarquee() {
  const track = document.querySelector('[data-marquee] .marquee__track');
  if (!track || state.reduced) return;
  let x = 0;
  let boost = 0;
  gsap.ticker.add((_t, deltaMs) => {
    const third = track.scrollWidth / 3;
    boost += (Math.min(Math.abs(state.lenis?.velocity ?? 0), 60) - boost) * 0.06;
    x -= (0.022 + boost * 0.004) * deltaMs;
    if (-x >= third) x += third;
    track.style.transform = `translate3d(${x}px,0,0)`;
  });
}
