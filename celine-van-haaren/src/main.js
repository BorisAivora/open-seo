import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { state } from './core/state.js';
import { initScroll } from './core/scroll.js';
import { createStage } from './gl/stage.js';
import { initTimeOfDay } from './ui/timeOfDay.js';
import { initLenses } from './ui/lens.js';
import { initCursor } from './ui/cursor.js';
import { initMarquee, initReveals, playIntro } from './ui/reveals.js';
import { initContactForms, initHeader, initQuotes, initStickyCta, initTransitions, runPreloader } from './ui/site.js';

gsap.registerPlugin(ScrollTrigger, SplitText);
// Tells the inline failsafe in <head> that the scripts are running (see templates/layout.js).
window.__cvhReady = true;

initScroll();
initTimeOfDay();

// Under reduced motion the photographs stay plain <img> elements.
const stage = state.reduced ? null : createStage(document.querySelector('[data-gl-canvas]'));
if (stage) {
  for (const img of document.querySelectorAll('img[data-gl]')) {
    const item = stage.add(img);
    if (img.closest('[data-hero-media]')) item.revealDelay = 0.35;
  }
  // The stage renders after Lenis has moved the page, in the same tick.
  gsap.ticker.add(stage.render);
}

initLenses(stage);
initCursor();
initHeader();
initQuotes();
initContactForms();
initStickyCta();
initTransitions();
initMarquee();

document.fonts.ready.then(() => {
  initReveals({ gl: !!stage });
  ScrollTrigger.refresh();
  stage?.refresh();
});

runPreloader().then(() => {
  playIntro();
  stage?.start();
});
