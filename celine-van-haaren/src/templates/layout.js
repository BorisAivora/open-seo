import { contact, routes, t } from '../data/i18n.js';

export const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export const SITE = 'https://celinevanhaaren.com';

// Responsive project image. `data-gl` hands it to the WebGL stage, which draws it with the
// material shader and hides the DOM copy once its texture is ready.
export function media(image, { alt = '', sizes = '(min-width: 1024px) 50vw, 100vw', eager = false, gl = true, cls = '' } = {}) {
  return `<div class="media ${cls}" style="aspect-ratio:${image.w}/${image.h};--r:${(image.w / image.h).toFixed(4)}">
    <img src="${image.sm}" srcset="${image.sm} 900w, ${image.src} 1800w" sizes="${sizes}"
      width="${image.w}" height="${image.h}" alt="${esc(alt)}"
      ${gl ? `data-gl data-gl-src="${image.src}"` : ''}
      loading="${eager ? 'eager' : 'lazy'}" decoding="async" ${eager ? 'fetchpriority="high"' : ''}>
  </div>`;
}

function header(lang, alternate) {
  const s = t[lang];
  const r = routes[lang];
  const other = alternate ?? routes[s.other].home;
  const links = [
    [r.projects, s.nav.projects],
    [`${r.home}#studio`, s.nav.studio],
    ...(r.kennisbank ? [[r.kennisbank, s.nav.kennisbank]] : []),
  ];
  return `
<a href="#main" class="skip-link">${s.skip}</a>
<header class="site-header" data-header>
  <a href="${r.home}" class="wordmark" aria-label="Céline van Haaren Interiors, home">
    <span class="wordmark__name">Céline van Haaren</span>
    <span class="wordmark__sub">Interiors</span>
  </a>
  <nav class="site-nav" aria-label="Menu">
    ${links.map(([href, label]) => `<a href="${href}" class="nav-link">${label}</a>`).join('')}
    <a href="${other}" class="nav-link nav-lang" hreflang="${s.other}" lang="${s.other}" aria-label="${s.otherLabel}">${s.other.toUpperCase()}</a>
    <a href="#contact" class="btn btn--small nav-cta" data-cta="header">${s.nav.cta}</a>
  </nav>
  <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
    <span class="menu-toggle__label" data-open="${s.nav.menu}" data-close="${s.nav.close}">${s.nav.menu}</span>
  </button>
</header>
<div class="mobile-menu" id="mobile-menu" data-mobile-menu hidden>
  <nav class="mobile-menu__nav">
    ${links.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')}
    <a href="#contact">${s.nav.cta}</a>
    <a href="${other}" hreflang="${s.other}" lang="${s.other}" class="mobile-menu__lang">${s.otherLabel}</a>
  </nav>
</div>
<a href="#contact" class="sticky-cta" data-sticky-cta data-cta="sticky">${s.stickyCta}</a>`;
}

// The evening section: shared by every page so each visit ends at golden hour, with the
// request form as the page's one conversion. The form posts to Netlify Forms by default;
// set data-endpoint on the form for another form backend.
export function contactSection(lang) {
  const s = t[lang].contactSection;
  const f = s.form;
  return `
<section class="contact" id="contact" data-tod="evening" aria-labelledby="contact-title">
  <div class="contact__lights" aria-hidden="true">
    <span class="sconce" style="--x:12%;--y:22%"></span>
    <span class="sconce" style="--x:88%;--y:18%"></span>
    <span class="glow glow--floor" style="--x:72%;--y:78%"></span>
  </div>
  <div class="container contact__inner">
    <p class="eyebrow" data-reveal>${s.eyebrow}</p>
    <h2 class="display contact__title" id="contact-title" data-split>
      ${s.title1} <em>${s.title2}</em>
    </h2>
    <div class="contact__grid">
      <form class="contact-form" name="kennismaking" method="POST" data-netlify="true" netlify-honeypot="bot-field" data-contact-form data-endpoint="/">
        <input type="hidden" name="form-name" value="kennismaking">
        <input type="hidden" name="taal" value="${lang}">
        <p class="contact-form__intro">${s.body}</p>
        <p hidden><label>Bot <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <div class="field"><label for="cf-name-${lang}">${f.name}</label><input id="cf-name-${lang}" name="naam" type="text" autocomplete="name" required></div>
        <div class="field"><label for="cf-email-${lang}">${f.email}</label><input id="cf-email-${lang}" name="email" type="email" autocomplete="email" required></div>
        <div class="field"><label for="cf-phone-${lang}">${f.phone}</label><input id="cf-phone-${lang}" name="telefoon" type="tel" autocomplete="tel"></div>
        <div class="field"><label for="cf-msg-${lang}">${f.message}</label><textarea id="cf-msg-${lang}" name="project" rows="3" placeholder="${esc(f.placeholder)}"></textarea></div>
        <button type="submit" class="btn btn--primary btn--light" data-sending="${f.sending}">${f.submit}</button>
        <p class="cta-note">${f.reassure}</p>
        <p class="contact-form__status" role="status" data-success="${esc(f.success)}" data-error="${esc(f.error)}"></p>
      </form>
      <div class="contact__direct">
        <p class="contact__direct-title">${s.direct}</p>
        <dl class="contact__list">
          <div><dt>${s.phone}</dt><dd><a href="${contact.phoneHref}" class="link-line" data-cta="phone">${contact.phone}</a></dd></div>
          <div><dt>${s.whatsapp}</dt><dd><a href="${contact.whatsapp}" class="link-line" target="_blank" rel="noopener" data-cta="whatsapp">${contact.phone}</a></dd></div>
          <div><dt>${s.email}</dt><dd><a href="mailto:${contact.email}" class="link-line" data-cursor="mail" data-cta="email">${contact.email}</a></dd></div>
          <div><dt>${s.studio}</dt><dd>${contact.street}<br>${contact.city}</dd></div>
          <div><dt>${s.follow}</dt><dd><a href="${contact.instagram}" class="link-line" target="_blank" rel="noopener">${contact.instagramHandle}</a></dd></div>
        </dl>
      </div>
    </div>
  </div>
</section>`;
}

function footer(lang) {
  const s = t[lang];
  const r = routes[lang];
  return `
<footer class="site-footer" data-tod="evening">
  <div class="container site-footer__inner">
    <span>© ${new Date().getFullYear()} Céline van Haaren Interiors · ${contact.street}, ${contact.city}</span>
    <nav class="site-footer__nav" aria-label="Footer">
      <a href="${r.projects}" class="link-line">${s.nav.projects}</a>
      ${r.kennisbank ? `<a href="${r.kennisbank}" class="link-line">${s.nav.kennisbank}</a>` : ''}
      <a href="#top" class="link-line" data-scroll-top>${s.footer.top} ↑</a>
    </nav>
  </div>
</footer>`;
}

// Structured data shared by every page: the business itself (NAP matches the footer).
export const business = {
  '@type': 'LocalBusiness',
  '@id': `${SITE}/#business`,
  name: 'Céline van Haaren Interiors',
  description: 'Interieurontwerp en uitvoering van complete interieurs, studio in Amsterdam.',
  url: `${SITE}/`,
  image: `${SITE}/images/xx-00.webp`,
  email: contact.email,
  telephone: '+31645605355',
  address: {
    '@type': 'PostalAddress',
    streetAddress: contact.street,
    postalCode: '1075 EP',
    addressLocality: 'Amsterdam',
    addressCountry: 'NL',
  },
  sameAs: [contact.instagram],
};

export function layout({ lang, path, alternate = null, title, description, body, image, schema = [], ogType = 'website' }) {
  const s = t[lang];
  const nlPath = lang === 'nl' ? path : alternate;
  const enPath = lang === 'en' ? path : alternate;
  const hreflang = alternate
    ? `<link rel="alternate" hreflang="nl" href="${SITE}${nlPath}">
  <link rel="alternate" hreflang="en" href="${SITE}${enPath}">
  <link rel="alternate" hreflang="x-default" href="${SITE}${nlPath}">`
    : '';
  const jsonLd = { '@context': 'https://schema.org', '@graph': [business, ...schema] };
  return `<!doctype html>
<html lang="${lang}" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${SITE}${path}">
  ${hreflang}
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${SITE}${image}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${SITE}${path}">
  <meta property="og:locale" content="${lang === 'nl' ? 'nl_NL' : 'en_GB'}">
  <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
  <meta name="theme-color" content="#F6F2EC">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script>(function(d){d.classList.replace('no-js','js');try{if(sessionStorage.getItem('cvh-visited'))d.classList.add('is-return');if(sessionStorage.getItem('cvh-transition')){sessionStorage.removeItem('cvh-transition');d.classList.add('from-transition')}}catch(e){}setTimeout(function(){if(!window.__cvhReady){d.classList.remove('js','is-return','from-transition');d.classList.add('no-js')}},4000)})(document.documentElement)</script>
  <link rel="stylesheet" href="/src/styles/main.css">
  <script type="module" src="/src/main.js"></script>
</head>
<body id="top">
  <div class="preloader" data-preloader aria-hidden="true">
    <div class="preloader__mark">
      <span class="preloader__name">Céline van Haaren</span>
      <span class="preloader__line"><span data-preloader-bar></span></span>
      <span class="preloader__label">${s.loading}</span>
    </div>
  </div>
  <div class="curtain" data-curtain aria-hidden="true"></div>
  <canvas class="gl-canvas" data-gl-canvas aria-hidden="true"></canvas>
  <div class="daylight" aria-hidden="true">
    <svg class="daylight__window" viewBox="0 0 1000 1000" preserveAspectRatio="none">
      <g fill="#2A2622">
        <rect x="0" y="0" width="1000" height="70"/>
        <rect x="0" y="0" width="70" height="1000"/>
        <rect x="465" y="0" width="70" height="1000"/>
        <rect x="930" y="0" width="70" height="1000"/>
        <rect x="0" y="430" width="1000" height="44"/>
        <rect x="0" y="930" width="1000" height="70"/>
      </g>
    </svg>
    <div class="daylight__evening"></div>
  </div>
  <div class="cursor" data-cursor-el aria-hidden="true">
    <span class="cursor__ring"></span>
    <span class="cursor__label" data-cursor-label></span>
  </div>
  ${header(lang, alternate)}
  <main id="main">
${body}
  </main>
  ${footer(lang)}
</body>
</html>`;
}
