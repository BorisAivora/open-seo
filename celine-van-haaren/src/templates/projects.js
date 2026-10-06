import { projects } from '../data/projects.js';
import { routes, t } from '../data/i18n.js';
import { contactSection, media } from './layout.js';
import { lensFigure } from './home.js';

export function projectsIndex(lang) {
  const s = t[lang];
  const r = routes[lang];
  return `
<section class="page-head" data-tod="morning">
  <div class="container">
    <p class="eyebrow" data-hero-fade>${projects.length} ${s.projectsPage.count}</p>
    <h1 class="display page-head__title" data-hero-title>
      <span class="hero__line"><span>${s.projectsPage.title}</span></span>
    </h1>
    <p class="lead page-head__intro" data-hero-fade>${s.projectsPage.intro}</p>
  </div>
</section>

<section class="index" data-tod="noon">
  <div class="container">
    <ul class="index-grid" role="list">
      ${projects
        .map(
          (p, i) => `
      <li class="index-item">
        <a href="${r.project(p.slug)}" class="work-card" data-cursor="${s.selected.view}">
          ${media(p.images[p.cover], { alt: `${p.title} — ${p.location[lang]}`, sizes: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw', eager: i < 2 })}
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

${contactSection(lang)}`;
}

export function projectPage(lang, project) {
  const s = t[lang];
  const r = routes[lang];
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const [cover, ...rest] = [project.images[project.cover], ...project.images.filter((_, i) => i !== project.cover)];
  const gallery = rest.filter((img) => img !== project.images[project.lens]);
  const paragraphs = project.body?.[lang] ?? [s.project.fallback];
  const alt = `${project.title} — ${project.location[lang]}`;

  // Pair the gallery into rows: a landscape image takes a full row, portraits sit side by side.
  const rows = [];
  for (let i = 0; i < gallery.length; i++) {
    const img = gallery[i];
    const nextImg = gallery[i + 1];
    if (img.w < img.h && nextImg && nextImg.w < nextImg.h) {
      rows.push([img, nextImg]);
      i++;
    } else rows.push([img]);
  }

  return `
<article>
  <section class="project-hero" data-tod="morning">
    <div class="container">
      <a href="${r.projects}" class="back-link" data-hero-fade>← ${s.project.back}</a>
      <p class="eyebrow" data-hero-fade>${String(index + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}</p>
      <h1 class="display project-hero__title" data-hero-title>
        <span class="hero__line"><span>${project.title}</span></span>
      </h1>
      <dl class="project-facts" data-hero-fade>
        <div><dt>${s.project.location}</dt><dd>${project.location[lang]}</dd></div>
        <div><dt>${s.project.scope}</dt><dd>${s.project.scopeValue}</dd></div>
      </dl>
    </div>
    <div class="container project-hero__media" data-hero-media>
      ${media(cover, { alt, eager: true, sizes: '100vw' })}
    </div>
  </section>

  <section class="project-story" data-tod="noon">
    <div class="container project-story__grid">
      ${project.heading ? `<h2 class="display project-story__title" data-split>${project.heading[lang]}</h2>` : '<span></span>'}
      <div class="project-story__body">
        ${paragraphs.map((p) => `<p class="body-text" data-reveal>${p}</p>`).join('')}
      </div>
    </div>
  </section>

  <section class="gallery" data-tod="noon" aria-label="Galerij">
    <div class="container gallery__rows">
      ${rows
        .slice(0, 2)
        .map((row) => `<div class="gallery__row gallery__row--${row.length}">${row.map((img) => media(img, { alt, sizes: row.length === 2 ? '50vw' : '100vw' })).join('')}</div>`)
        .join('')}
    </div>
  </section>

  <section class="lens-section lens-section--project" data-tod="afternoon" aria-label="${s.lens.eyebrow}">
    <div class="container lens-section__grid">
      <div class="lens-section__text">
        <p class="eyebrow" data-reveal>${s.lens.eyebrow}</p>
        <p class="body-text" data-reveal>${s.lens.body}</p>
        <p class="lens-section__hint" data-reveal><i></i>${s.lens.hint}</p>
      </div>
      ${lensFigure(project, project.images[project.lens], lang)}
    </div>
  </section>

  <section class="gallery" data-tod="afternoon" aria-label="Galerij">
    <div class="container gallery__rows">
      ${rows
        .slice(2)
        .map((row) => `<div class="gallery__row gallery__row--${row.length}">${row.map((img) => media(img, { alt, sizes: row.length === 2 ? '50vw' : '100vw' })).join('')}</div>`)
        .join('')}
    </div>
  </section>

  <section class="next-project" data-tod="afternoon">
    <a href="${r.project(next.slug)}" class="container next-project__link" data-cursor="${s.selected.view}">
      <span class="eyebrow">${s.project.next}</span>
      <span class="display next-project__title">${next.title}</span>
      <span class="next-project__loc">${next.location[lang]}</span>
      <span class="next-project__media">${media(next.images[next.cover], { alt: next.title, sizes: '40vw' })}</span>
    </a>
  </section>
</article>

${contactSection(lang)}`;
}
