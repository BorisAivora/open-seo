// Renders every page (NL + EN, plus the Dutch kennisbank) from the templates into static HTML
// files that Vite then builds, and writes sitemap.xml and robots.txt into public/.
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/data/projects.js';
import { routes, t } from '../src/data/i18n.js';
import { SITE, layout } from '../src/templates/layout.js';
import { home } from '../src/templates/home.js';
import { projectsIndex, projectPage } from '../src/templates/projects.js';
import { articlePage, articles, kennisbankHub } from '../src/templates/kennisbank.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
for (const dir of ['projecten', 'en', 'kennisbank']) rmSync(join(root, dir), { recursive: true, force: true });

const faqSchema = (items) => ({
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

const pages = [];
for (const lang of ['nl', 'en']) {
  const r = routes[lang];
  const o = routes[t[lang].other];
  const s = t[lang];
  pages.push({
    lang,
    path: r.home,
    alternate: o.home,
    title: s.metaTitle,
    description: s.metaDescription,
    body: home(lang),
    image: projects[0].images[0].src,
    schema: [faqSchema(s.faq.items)],
  });
  pages.push({
    lang,
    path: r.projects,
    alternate: o.projects,
    title: `${s.projectsPage.title} | Céline van Haaren Interiors`,
    description: s.projectsPage.intro,
    body: projectsIndex(lang),
    image: projects[1].images[0].src,
  });
  for (const p of projects) {
    pages.push({
      lang,
      path: r.project(p.slug),
      alternate: o.project(p.slug),
      title: `${p.title}, ${p.location[lang]} | Céline van Haaren Interiors`,
      description: p.heading ? `${p.heading[lang]}. ${p.body[lang][0]}`.slice(0, 157).replace(/\s+\S*$/, '…') : `${p.title}, ${p.location[lang]}. ${s.project.fallback}`,
      body: projectPage(lang, p),
      image: p.images[p.cover].src,
    });
  }
}
pages.push(kennisbankHub(), ...articles.map(articlePage));

for (const page of pages) {
  const file = join(root, page.path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, layout(page));
}

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(root, 'public/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE}${p.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`,
);
writeFileSync(join(root, 'public/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`Generated ${pages.length} pages`);
