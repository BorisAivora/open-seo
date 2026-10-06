import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { state } from '../core/state.js';

// THE TIME OF DAY: four light states, blended continuously by scroll position.
// Sections declare their moment with data-tod; each change of moment becomes a stop.
const palettes = {
  morning: {
    bg: '#F6F2EC', surface: '#EEE7DD', ink: '#2A2622', inkSoft: [42, 38, 34, 0.62], accent: '#9C7A54',
    line: [42, 38, 34, 0.14], shade: 0.05, sun: 0, evening: 0, warm: 0,
  },
  noon: {
    bg: '#EDE4D7', surface: '#E4D9C9', ink: '#2A2622', inkSoft: [42, 38, 34, 0.64], accent: '#957249',
    line: [42, 38, 34, 0.15], shade: 0.07, sun: 0.45, evening: 0, warm: 0.25,
  },
  afternoon: {
    bg: '#E5D6C2', surface: '#DCCAB3', ink: '#2A2420', inkSoft: [42, 36, 32, 0.66], accent: '#8A6640',
    line: [42, 36, 32, 0.16], shade: 0.09, sun: 1, evening: 0.15, warm: 0.6,
  },
  evening: {
    bg: '#1E1A17', surface: '#27221E', ink: '#F1EADF', inkSoft: [241, 234, 223, 0.62], accent: '#C9A57A',
    line: [241, 234, 223, 0.14], shade: 0, sun: 1, evening: 1, warm: 1,
  },
};

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)).concat(1);
const toVector = (p) => Object.fromEntries(Object.entries(p).map(([k, v]) => [k, typeof v === 'string' ? hex(v) : v]));
const mix = (a, b, t) =>
  Object.fromEntries(Object.keys(a).map((k) => [k, Array.isArray(a[k]) ? a[k].map((v, i) => v + (b[k][i] - v) * t) : a[k] + (b[k] - a[k]) * t]));
const ease = gsap.parseEase('sine.inOut');
const rgba = ([r, g, b, a]) => `rgb(${r.toFixed(1)} ${g.toFixed(1)} ${b.toFixed(1)} / ${a.toFixed(3)})`;

export function initTimeOfDay() {
  const root = document.documentElement;
  const sections = [...document.querySelectorAll('[data-tod]')];
  let stops = [];

  function build() {
    const vh = window.innerHeight;
    stops = [];
    let previous = null;
    for (const section of sections) {
      const moment = section.dataset.tod;
      if (moment === previous) continue;
      const top = section.getBoundingClientRect().top + window.scrollY;
      // The light shifts while the new section rises through the lower part of the screen;
      // dusk is given a longer, slower fade.
      const span = moment === 'evening' ? vh * 1.1 : vh * 0.8;
      stops.push({ start: top - vh - span * 0.1, end: top - vh + span, palette: toVector(palettes[moment]) });
      previous = moment;
    }
    update();
  }

  function update() {
    if (!stops.length) return;
    const y = window.scrollY;
    let current = stops[0].palette;
    for (const stop of stops.slice(1)) {
      const t = gsap.utils.clamp(0, 1, (y - stop.start) / (stop.end - stop.start));
      if (t > 0) current = mix(current, stop.palette, ease(t));
    }
    const s = root.style;
    s.setProperty('--bg', rgba(current.bg));
    s.setProperty('--surface', rgba(current.surface));
    s.setProperty('--ink', rgba(current.ink));
    s.setProperty('--ink-soft', rgba(current.inkSoft));
    s.setProperty('--accent', rgba(current.accent));
    s.setProperty('--line', rgba(current.line));
    s.setProperty('--shade', current.shade.toFixed(4));
    s.setProperty('--sun', current.sun.toFixed(4));
    s.setProperty('--evening', current.evening.toFixed(4));
    state.warm = current.warm;
    state.evening = current.evening;
  }

  build();
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: update, onRefresh: build });
  initLamps();
}

// At dusk the design lighting in the contact section switches on: a soft ignition, a breath,
// then a steady warm glow. Scrolling back up switches it off again.
function initLamps() {
  const contact = document.querySelector('.contact');
  if (!contact) return;
  const lamps = contact.querySelectorAll('.sconce, .glow');
  const on = () =>
    gsap.to(lamps, {
      keyframes: [
        { '--lamp-on': 0.55, duration: 0.35, ease: 'power2.out' },
        { '--lamp-on': 0.4, duration: 0.25, ease: 'sine.inOut' },
        { '--lamp-on': 1, duration: 2.2, ease: 'power3.out' },
      ],
      stagger: 0.45,
      overwrite: true,
    });
  const off = () => gsap.to(lamps, { '--lamp-on': 0, duration: 1.2, ease: 'power2.inOut', overwrite: true });
  if (state.reduced) {
    ScrollTrigger.create({ trigger: contact, start: 'top 60%', onEnter: () => gsap.set(lamps, { '--lamp-on': 1 }), onLeaveBack: () => gsap.set(lamps, { '--lamp-on': 0 }) });
    return;
  }
  ScrollTrigger.create({ trigger: contact, start: 'top 55%', onEnter: on, onLeaveBack: off });
}
