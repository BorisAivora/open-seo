// Renders every page (NL + EN) from the templates into static HTML files that Vite then builds.
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/data/projects.js';
import { routes, t } from '../src/data/i18n.js';
import { layout } from '../src/templates/layout.js';
import { home } from '../src/templates/home.js';
import { projectsIndex, projectPage } from '../src/templates/projects.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
for (const dir of ['projecten', 'en']) rmSync(join(root, dir), { recursive: true, force: true });

const pages = [];
for (const lang of ['nl', 'en']) {
  const r = routes[lang];
  const o = routes[t[lang].other];
  const s = t[lang];
  pages.push({ lang, path: r.home, alternate: o.home, title: s.metaTitle, description: s.metaDescription, body: home(lang), image: projects[0].images[0].src });
  pages.push({
    lang,
    path: r.projects,
    alternate: o.projects,
    title: `${s.projectsPage.title} — Céline van Haaren Interiors`,
    description: s.projectsPage.intro,
    body: projectsIndex(lang),
    image: projects[1].images[0].src,
  });
  for (const p of projects) {
    pages.push({
      lang,
      path: r.project(p.slug),
      alternate: o.project(p.slug),
      title: `${p.title}, ${p.location[lang]} — Céline van Haaren Interiors`,
      description: p.heading ? `${p.heading[lang]}. ${p.body[lang][0]}`.slice(0, 160) : `${p.title}, ${p.location[lang]}. ${s.project.fallback}`,
      body: projectPage(lang, p),
      image: p.images[p.cover].src,
    });
  }
}

for (const page of pages) {
  const file = join(root, page.path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, layout(page));
}
console.log(`Generated ${pages.length} pages`);
