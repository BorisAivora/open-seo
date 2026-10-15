import { projects, featured } from '../data/projects.js';
import { routes, t } from '../data/i18n.js';
import { contactSection, esc, media } from './layout.js';

const materials = {
  nl: ['Travertijn', 'Eikenhout', 'Warm marmer', 'Brons', 'Linnen', 'Natuursteen', 'Kalkverf'],
  en: ['Travertine', 'Oak', 'Warm marble', 'Bronze', 'Linen', 'Natural stone', 'Lime paint'],
};

// Homepage, ordered as a conversion page: promise and CTA above the fold, recognition,
// proof (projects, reviews), how it works, objections, the person, then the request form.
export function home(lang) {
  const s = t[lang];
  const r = routes[lang];
  const hero = projects.find((p) => p.slug === 'xx');
  const lensProject = projects.find((p) => p.slug === 'xv');
  const lensImage = lensProject.images[lensProject.lens];
  const studioImage = projects.find((p) => p.slug === 'viii').images[0];
  const words = materials[lang].map((m) => `<span>${m}</span><span class="marquee__dot" aria-hidden="true">·</span>`).join('');

  return `
<section class="hero" data-tod="morning">
  <div class="container hero__grid">
    <div class="hero__text">
      <p class="eyebrow" data-hero-fade>${s.hero.eyebrow}</p>
      <h1 class="display hero__title" data-hero-title>
        ${s.hero.lines.map((l) => `<span class="hero__line"><span>${l}</span></span>`).join('')}
      </h1>
      <p class="hero__sub" data-hero-fade>${s.hero.sub}</p>
      <div class="cta-row" data-hero-fade>
        <a href="#contact" class="btn btn--primary" data-cta="hero">${s.hero.cta}</a>
        <a href="${r.projects}" class="btn btn--ghost">${s.hero.secondary}</a>
      </div>
      <p class="cta-note" data-hero-fade>${s.hero.reassure}</p>
      <figure class="hero__proof" data-hero-fade>
        <blockquote>${s.hero.proof}</blockquote>
        <figcaption>${s.hero.proofWho}</figcaption>
      </figure>
    </div>
    <a href="${r.project(hero.slug)}" class="hero__media" data-cursor="${s.selected.view}" data-hero-media>
      ${media(hero.images[hero.cover], { alt: `${hero.title}, ${hero.location[lang]}`, eager: true, sizes: '(min-width: 1024px) 45vw, 100vw' })}
      <span class="media-caption"><span>${hero.title}</span><span>${hero.location[lang]}</span></span>
    </a>
  </div>
</section>

<section class="intro" data-tod="morning">
  <div class="container">
    <p class="statement" data-words>${s.recognition}</p>
  </div>
</section>

<div class="marquee" aria-hidden="true" data-marquee>
  <div class="marquee__track">${words}${words}${words}</div>
</div>

<section class="selected" data-tod="noon" aria-labelledby="selected-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow" data-reveal>${s.selected.eyebrow}</p>
      <h2 class="display section-head__title" id="selected-title" data-split>${s.selected.title}</h2>
      <a href="${r.projects}" class="link-line section-head__link" data-reveal>${s.selected.all} (${projects.length})</a>
    </div>
    <ul class="work-grid" role="list">
      ${featured
        .map(
          (p, i) => `
      <li class="work-item work-item--${i + 1}">
        <a href="${r.project(p.slug)}" class="work-card" data-cursor="${s.selected.view}">
          ${media(p.images[p.cover], { alt: `${p.title}, ${p.location[lang]}`, sizes: '(min-width: 1024px) 40vw, 100vw' })}
          <span class="work-card__meta" data-reveal>
            <span class="work-card__num">${String(i + 1).padStart(2, '0')}</span>
            <span class="work-card__title">${p.title}</span>
            <span class="work-card__loc">${p.location[lang]}</span>
          </span>
        </a>
      </li>`,
        )
        .join('')}
    </ul>
  </div>
</section>

<section class="reviews" data-tod="noon" aria-labelledby="reviews-title">
  <div class="container">
    <div class="section-head section-head--center">
      <p class="eyebrow" data-reveal>${s.quotesHead.eyebrow}</p>
      <h2 class="display section-head__title" id="reviews-title" data-split>${s.quotesHead.title}</h2>
    </div>
    <div class="quotes" data-quotes>
      ${s.quotes
        .map(
          ([q, who], i) => `
      <figure class="quote${i === 0 ? ' is-active' : ''}" data-quote>
        <blockquote><p>“${esc(q)}”</p></blockquote>
        <figcaption>${who}</figcaption>
      </figure>`,
        )
        .join('')}
      <div class="quotes__dots">
        ${s.quotes.map((_, i) => `<button type="button" class="quotes__dot${i === 0 ? ' is-active' : ''}" aria-label="Review ${i + 1}" data-quote-dot></button>`).join('')}
      </div>
    </div>
  </div>
</section>

<section class="process" id="werkwijze" data-tod="afternoon" aria-labelledby="process-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow" data-reveal>${s.process.eyebrow}</p>
      <h2 class="display section-head__title" id="process-title" data-split>${s.process.title}</h2>
    </div>
    <ol class="process__list">
      ${s.process.steps
        .map(
          ([title, body], i) => `
      <li class="process__step" data-reveal>
        <span class="process__num">${['I', 'II', 'III', 'IV'][i]}</span>
        <h3 class="process__title">${title}</h3>
        <p class="body-text">${body}</p>
      </li>`,
        )
        .join('')}
    </ol>
    <div class="cta-row cta-row--section" data-reveal>
      <a href="#contact" class="btn btn--primary" data-cta="process">${s.hero.cta}</a>
      <p class="cta-note">${s.hero.reassure}</p>
    </div>
  </div>
</section>

<section class="lens-section" data-tod="afternoon" aria-labelledby="lens-title">
  <div class="container lens-section__grid">
    <div class="lens-section__text">
      <p class="eyebrow" data-reveal>${s.lens.eyebrow}</p>
      <h2 class="display lens-section__title" id="lens-title" data-split>${s.lens.title}</h2>
      <p class="body-text" data-reveal>${s.lens.body}</p>
      <p class="lens-section__hint" data-reveal><i></i>${s.lens.hint}</p>
    </div>
    ${lensFigure(lensProject, lensImage, lang)}
  </div>
</section>

<section class="faq" data-tod="afternoon" aria-labelledby="faq-title">
  <div class="container faq__grid">
    <div>
      <p class="eyebrow" data-reveal>${s.faq.eyebrow}</p>
      <h2 class="display faq__title" id="faq-title" data-split>${s.faq.title}</h2>
    </div>
    ${faqList(s.faq.items)}
  </div>
</section>

<section class="studio" id="studio" data-tod="afternoon" aria-labelledby="studio-title">
  <div class="container studio__grid">
    <div class="studio__media">
      ${media(studioImage, { alt: lang === 'nl' ? 'Detail van travertijn en brons' : 'Detail of travertine and bronze', sizes: '(min-width: 1024px) 40vw, 100vw' })}
    </div>
    <div class="studio__text">
      <p class="eyebrow" data-reveal>${s.studio.eyebrow}</p>
      <h2 class="display studio__title" id="studio-title" data-split>${s.studio.title}</h2>
      ${s.studio.body.map((p) => `<p class="body-text" data-reveal>${p}</p>`).join('')}
    </div>
  </div>
</section>

${contactSection(lang)}`;
}

export function faqList(items) {
  return `<div class="faq__list">
      ${items
        .map(
          ([q, a]) => `
      <details class="faq__item" data-reveal>
        <summary>${q}<i aria-hidden="true"></i></summary>
        <p>${a}</p>
      </details>`,
        )
        .join('')}
    </div>`;
}

// The Lens Reveal: WebGL draws the finished room with a soft circular lens that shows the
// same space as a hand-drawn design. A project with a `before` image swaps the drawing for it.
export function lensFigure(project, image, lang) {
  const s = t[lang].lens;
  const before = project.before != null ? project.images[project.before].src : '';
  return `
    <figure class="lens" data-lens data-lens-src="${image.src}" data-lens-before="${before}" data-cursor="lens" style="aspect-ratio:${image.w}/${image.h}">
      <img src="${image.sm}" srcset="${image.sm} 900w, ${image.src} 1800w" sizes="(min-width: 1024px) 60vw, 100vw"
        width="${image.w}" height="${image.h}" alt="${esc(`${project.title} — ${project.location[lang]}`)}" loading="lazy" decoding="async">
      <span class="lens__fallback" aria-hidden="true" style="background-image:url(${image.sm})"></span>
      <figcaption class="lens__labels" aria-hidden="true">
        <span>${before ? s.after : s.outside}</span><span class="lens__inside" data-lens-label>${before ? s.before : s.inside}</span>
      </figcaption>
    </figure>`;
}
