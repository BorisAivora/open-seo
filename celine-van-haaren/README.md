# Céline van Haaren Interiors — website

Static, bilingual (NL/EN) website with three WebGL/GSAP interactions:

1. **Material hover** — project photos are drawn by one shared Three.js canvas. A pointer
   flowmap displaces the photo a few pixels and adds a grazing highlight, as if it lies
   under thick glass (`src/gl/shaders.js` → `imageFragment`).
2. **Lens reveal** — a soft circular lens that follows the pointer with inertia. Inside it
   the room is shown as a hand-drawn design; give a project a `before` image index in
   `src/data/projects.js` and the lens shows that before-photo instead (`lensFragment`,
   `src/ui/lens.js`).
3. **Time of day** — sections carry `data-tod="morning|noon|afternoon|evening"`; scrolling
   blends the palette, moves the window-light shadow and, at the contact section, switches
   on the wall lights (`src/ui/timeOfDay.js`).

Reduced motion and browsers without WebGL get plain images and a CSS clip-path lens.

## Develop

```bash
npm install
npm run dev      # generates the pages, then starts Vite
npm run build    # static site in dist/
npm run preview
```

Pages are rendered from `src/templates/*` and `src/data/*` by `scripts/build-pages.mjs`
into `index.html`, `projecten/`, and `en/` (generated, not committed).

## Content

- Projects, texts and image choices: `src/data/projects.js`
- Interface copy (NL/EN) and contact details: `src/data/i18n.js`
- Images: `public/images/<project>-NN.webp` (1800 px) and `-sm.webp` (900 px). Image sizes
  are listed in `src/data/images.json`; update it when adding photos.

## Deploy

`dist/` is a plain static site: Netlify, Vercel, Cloudflare Pages or any web host.
