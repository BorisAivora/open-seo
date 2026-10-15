import { gsap } from 'gsap';
import { state } from '../core/state.js';
import { scrollTo } from '../core/scroll.js';

const storage = {
  get: (k) => {
    try {
      return sessionStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set: (k, v) => {
    try {
      sessionStorage.setItem(k, v);
    } catch {}
  },
};

// Preloader on the first page of a visit only: waits for fonts and the hero images.
export function runPreloader() {
  const el = document.querySelector('[data-preloader]');
  const bar = el.querySelector('[data-preloader-bar]');
  if (storage.get('cvh-visited') || state.reduced) {
    el.classList.add('is-done');
    return Promise.resolve();
  }
  storage.set('cvh-visited', '1');
  const images = [...document.querySelectorAll('[data-hero-media] img, .hero img')];
  const waits = [document.fonts.ready, ...images.map((img) => img.decode?.().catch(() => {}))];
  let done = 0;
  waits.forEach((p) => Promise.resolve(p).then(() => gsap.to(bar, { scaleX: ++done / waits.length, duration: 0.8, ease: 'power3.out' })));
  const minimum = new Promise((r) => setTimeout(r, 1300));
  return Promise.all([...waits, minimum]).then(
    () =>
      new Promise((resolve) =>
        gsap
          .timeline({ onComplete: () => el.classList.add('is-done') })
          .to(bar, { scaleX: 1, duration: 0.4 })
          .to(el.querySelector('.preloader__mark'), { opacity: 0, y: -12, duration: 0.9, ease: 'power2.inOut' })
          .add(resolve, '-=0.2')
          .to(el, { opacity: 0, duration: 1.2, ease: 'power2.inOut' }, '-=0.2'),
      ),
  );
}

// Internal navigation fades through a curtain in the current light colour.
export function initTransitions() {
  const curtain = document.querySelector('[data-curtain]');
  if (document.documentElement.classList.contains('from-transition')) {
    gsap.fromTo(curtain, { opacity: 1 }, { opacity: 0, duration: 1.1, ease: 'power2.inOut', delay: 0.1 });
    document.documentElement.classList.remove('from-transition');
  }
  window.addEventListener('pageshow', (e) => e.persisted && gsap.set(curtain, { opacity: 0 }));

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.protocol === 'mailto:') return;

    if (url.pathname === location.pathname && url.hash) {
      e.preventDefault();
      closeMenu();
      scrollTo(url.hash === '#top' ? 0 : url.hash);
      return;
    }
    if (state.reduced) return;
    e.preventDefault();
    storage.set('cvh-transition', '1');
    gsap.to(curtain, { opacity: 1, duration: 0.7, ease: 'power2.inOut', onComplete: () => (location.href = url.href) });
  });
}

export function initHeader() {
  const header = document.querySelector('[data-header]');
  let last = 0;
  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    header.classList.toggle('is-hidden', y > last && y > 300 && !menuOpen);
    last = y;
  };
  window.addEventListener('scroll', update, { passive: true });
  update();

  document.querySelector('[data-menu-toggle]').addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()));
}

let menuOpen = false;
function openMenu() {
  const menu = document.querySelector('[data-mobile-menu]');
  const toggle = document.querySelector('[data-menu-toggle]');
  menuOpen = true;
  menu.hidden = false;
  toggle.setAttribute('aria-expanded', 'true');
  toggle.firstElementChild.textContent = toggle.firstElementChild.dataset.close;
  state.lenis?.stop();
  gsap.fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.inOut' });
  gsap.fromTo(menu.querySelectorAll('a'), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.2, ease: 'expo.out', stagger: 0.07, delay: 0.35 });
}
function closeMenu() {
  if (!menuOpen) return;
  const menu = document.querySelector('[data-mobile-menu]');
  const toggle = document.querySelector('[data-menu-toggle]');
  menuOpen = false;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.firstElementChild.textContent = toggle.firstElementChild.dataset.open;
  state.lenis?.start();
  gsap.to(menu, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut', onComplete: () => (menu.hidden = true) });
}

export function initQuotes() {
  const quotes = [...document.querySelectorAll('[data-quote]')];
  const dots = [...document.querySelectorAll('[data-quote-dot]')];
  if (!quotes.length) return;
  let index = 0;
  const show = (i) => {
    index = i;
    quotes.forEach((q, n) => q.classList.toggle('is-active', n === i));
    dots.forEach((d, n) => {
      d.classList.toggle('is-active', n === i);
      d.setAttribute('aria-selected', n === i);
    });
  };
  let timer = setInterval(() => show((index + 1) % quotes.length), 8000);
  dots.forEach((d, i) =>
    d.addEventListener('click', () => {
      clearInterval(timer);
      show(i);
      timer = setInterval(() => show((index + 1) % quotes.length), 8000);
    }),
  );
}

// The request form: posts in the background and answers inline, so the visitor never leaves
// the page. On failure it points to the direct contact details next to the form.
export function initContactForms() {
  for (const form of document.querySelectorAll('[data-contact-form]')) {
    const status = form.querySelector('.contact-form__status');
    const button = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const label = button.textContent;
      button.disabled = true;
      button.textContent = button.dataset.sending;
      status.classList.remove('is-error');
      try {
        const res = await fetch(form.dataset.endpoint || '/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form)).toString(),
        });
        if (!res.ok) throw new Error(res.status);
        status.textContent = status.dataset.success;
        form.reset();
        window.dispatchEvent(new CustomEvent('cvh:lead', { detail: { form: form.name } }));
      } catch {
        status.textContent = status.dataset.error;
        status.classList.add('is-error');
      } finally {
        button.disabled = false;
        button.textContent = label;
      }
    });
  }
}

// Mobile: a fixed "plan a call" button appears once the hero's own CTA has scrolled away
// and steps aside again when the contact section is on screen.
export function initStickyCta() {
  const button = document.querySelector('[data-sticky-cta]');
  const contactEl = document.querySelector('#contact');
  if (!button || !contactEl) return;
  const update = () => {
    const past = window.scrollY > window.innerHeight * 0.8;
    const atContact = contactEl.getBoundingClientRect().top < window.innerHeight * 0.9;
    button.classList.toggle('is-visible', past && !atContact);
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}
