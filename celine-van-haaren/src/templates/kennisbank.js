import { articles } from '../content/kennisbank.js';
import { projects } from '../data/projects.js';
import { routes, t } from '../data/i18n.js';
import { SITE, business, contactSection, media } from './layout.js';
import { faqList } from './home.js';

const lang = 'nl';
const s = t.nl;
const r = routes.nl;

const image = ([slug, i]) => projects.find((p) => p.slug === slug).images[i];
const words = (a) => [a.intro, ...a.sections.map((x) => x.html)].join(' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
export const readMinutes = (a) => Math.max(2, Math.round(words(a) / 200));
const date = (iso) => new Date(iso).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
const label = (a) => (a.type === 'pillar' ? s.kennisbank.pillar : s.kennisbank.article);

function card(a, { large = false } = {}) {
  return `
      <li class="kb-card${large ? ' kb-card--large' : ''}">
        <a href="${r.article(a.slug)}" class="kb-card__link" data-cursor="${s.kennisbank.read}">
          ${media(image(a.image), { alt: a.title, sizes: large ? '(min-width: 1024px) 55vw, 100vw' : '(min-width: 1024px) 33vw, 100vw' })}
          <span class="kb-card__body" data-reveal>
            <span class="kb-card__meta">${label(a)} · ${readMinutes(a)} ${s.kennisbank.minutes}</span>
            <span class="kb-card__title">${a.title}</span>
            <span class="kb-card__summary">${a.summary}</span>
          </span>
        </a>
      </li>`;
}

const breadcrumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE}${path}` })),
});

export function kennisbankHub() {
  const [pillar, ...rest] = [...articles.filter((a) => a.type === 'pillar'), ...articles.filter((a) => a.type !== 'pillar')];
  const body = `
<section class="page-head" data-tod="morning">
  <div class="container">
    <p class="eyebrow" data-hero-fade>${articles.length} artikelen</p>
    <h1 class="display page-head__title" data-hero-title>
      <span class="hero__line"><span>${s.kennisbank.title}</span></span>
    </h1>
    <p class="lead page-head__intro" data-hero-fade>${s.kennisbank.intro}</p>
  </div>
</section>

<section class="kb-index" data-tod="noon" aria-label="${s.kennisbank.title}">
  <div class="container">
    <ul class="kb-grid" role="list">
      ${card(pillar, { large: true })}
      ${rest.map((a) => card(a)).join('')}
    </ul>
  </div>
</section>

${contactSection(lang)}`;

  return {
    lang,
    path: r.kennisbank,
    title: s.kennisbank.metaTitle,
    description: s.kennisbank.metaDescription,
    body,
    image: image(pillar.image).src,
    schema: [
      breadcrumbs([['Home', r.home], [s.kennisbank.title, r.kennisbank]]),
      {
        '@type': 'CollectionPage',
        name: s.kennisbank.title,
        url: `${SITE}${r.kennisbank}`,
        hasPart: articles.map((a) => ({ '@type': 'Article', headline: a.title, url: `${SITE}${r.article(a.slug)}` })),
      },
    ],
  };
}

export function articlePage(a) {
  const others = articles.filter((x) => x !== a);
  const related = a.related.map((slug) => projects.find((p) => p.slug === slug));
  const url = `${SITE}${r.article(a.slug)}`;

  const body = `
<article class="kb-article">
  <header class="kb-head" data-tod="morning">
    <div class="container">
      <nav class="breadcrumbs" aria-label="Kruimelpad" data-hero-fade>
        <a href="${r.home}">Home</a><span aria-hidden="true">/</span><a href="${r.kennisbank}">${s.kennisbank.title}</a>
      </nav>
      <p class="eyebrow" data-hero-fade>${label(a)} · ${readMinutes(a)} ${s.kennisbank.minutes} · ${s.kennisbank.updated} <time datetime="${a.updated}">${date(a.updated)}</time></p>
      <h1 class="display kb-head__title" data-split>${a.title}</h1>
      <div class="kb-head__intro prose" data-hero-fade>${a.intro}</div>
    </div>
    <div class="container kb-head__media" data-hero-media>
      ${media(image(a.image), { alt: a.title, eager: true, sizes: '100vw' })}
    </div>
  </header>

  <div class="kb-body" data-tod="noon">
    <div class="container kb-body__grid">
      <nav class="kb-toc" aria-label="${s.kennisbank.toc}">
        <p class="eyebrow">${s.kennisbank.toc}</p>
        <ol>
          ${a.sections.map((x) => `<li><a href="#${x.id}">${x.h2}</a></li>`).join('')}
          <li><a href="#faq">${s.kennisbank.faq}</a></li>
        </ol>
      </nav>
      <div class="prose kb-prose">
        ${a.sections.map((x) => `<section id="${x.id}" aria-labelledby="${x.id}-h"><h2 id="${x.id}-h">${x.h2}</h2>${x.html}</section>`).join('\n')}
        <section id="faq" aria-labelledby="faq-h" class="kb-faq">
          <h2 id="faq-h">${s.kennisbank.faq}</h2>
          ${faqList(a.faq)}
        </section>
      </div>
    </div>
  </div>

  <section class="project-cta" data-tod="afternoon">
    <div class="container project-cta__inner">
      <h2 class="display project-cta__title" data-split>${s.kennisbank.ctaTitle}</h2>
      <p class="body-text" data-reveal>${s.project.ctaBody}</p>
      <div class="cta-row" data-reveal>
        <a href="#contact" class="btn btn--primary" data-cta="article">${s.hero.cta}</a>
        <p class="cta-note">${s.hero.reassure}</p>
      </div>
    </div>
  </section>

  <section class="kb-related" data-tod="afternoon" aria-labelledby="related-title">
    <div class="container">
      <h2 class="eyebrow" id="related-title">${s.kennisbank.related}</h2>
      <ul class="index-grid" role="list">
        ${related
          .map(
            (p, i) => `
        <li class="index-item">
          <a href="${r.project(p.slug)}" class="work-card" data-cursor="${s.selected.view}">
            ${media(p.images[p.cover], { alt: `${p.title}, ${p.location.nl}`, sizes: '(min-width: 1024px) 33vw, 100vw' })}
            <span class="work-card__meta" data-reveal>
              <span class="work-card__num">${String(i + 1).padStart(2, '0')}</span>
              <span class="work-card__title">${p.title}</span>
              <span class="work-card__loc">${p.location.nl}</span>
            </span>
          </a>
        </li>`,
          )
          .slice(0, 3)
          .join('')}
      </ul>
      <h2 class="eyebrow kb-related__more">${s.kennisbank.more}</h2>
      <ul class="kb-grid kb-grid--compact" role="list">
        ${others.map((x) => card(x)).join('')}
      </ul>
    </div>
  </section>
</article>

${contactSection(lang)}`;

  return {
    lang,
    path: r.article(a.slug),
    title: a.metaTitle,
    description: a.metaDescription,
    body,
    image: image(a.image).src,
    ogType: 'article',
    schema: [
      breadcrumbs([['Home', r.home], [s.kennisbank.title, r.kennisbank], [a.title, r.article(a.slug)]]),
      {
        '@type': 'Article',
        headline: a.title,
        description: a.metaDescription,
        image: `${SITE}${image(a.image).src}`,
        datePublished: a.published,
        dateModified: a.updated,
        inLanguage: 'nl-NL',
        mainEntityOfPage: url,
        author: { '@id': business['@id'] },
        publisher: { '@id': business['@id'] },
      },
      {
        '@type': 'FAQPage',
        mainEntity: a.faq.map(([q, ans]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: ans } })),
      },
    ],
  };
}

export { articles };
