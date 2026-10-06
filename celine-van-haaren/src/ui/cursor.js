import { gsap } from 'gsap';
import { state } from '../core/state.js';

// A small bronze point that trails the pointer. Over a project it opens into a ring with a
// label ("Bekijk"); over a lens it steps aside so the lens itself becomes the cursor.
export function initCursor() {
  if (!state.finePointer) return;
  const el = document.querySelector('[data-cursor-el]');
  const label = el.querySelector('[data-cursor-label]');
  document.documentElement.classList.add('has-cursor');
  const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
  const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
  let shown = false;

  window.addEventListener(
    'pointermove',
    (e) => {
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { opacity: 1, duration: 0.6 });
        shown = true;
      }
      x(e.clientX);
      y(e.clientY);
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => gsap.to(el, { opacity: 0, duration: 0.4 }));
  document.addEventListener('pointerenter', () => gsap.to(el, { opacity: 1, duration: 0.4 }));

  document.addEventListener('pointerover', (e) => {
    const target = e.target.closest('[data-cursor]');
    const mode = target?.dataset.cursor;
    el.classList.toggle('is-lens', mode === 'lens');
    el.classList.toggle('is-view', !!mode && mode !== 'lens' && mode !== 'mail');
    el.classList.toggle('is-link', !mode && !!e.target.closest('a, button'));
    if (mode && mode !== 'lens') label.textContent = mode === 'mail' ? '' : mode;
  });
}
