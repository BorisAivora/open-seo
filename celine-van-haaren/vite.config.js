import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Every generated index.html (see scripts/build-pages.mjs) is a build entry.
function htmlEntries(dir = '.', out = {}) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory() && !['node_modules', 'dist', 'public', 'src', 'scripts'].includes(entry.name)) htmlEntries(path, out);
    else if (entry.name === 'index.html') out[path.slice(2).replace(/\/?index\.html$/, '') || 'home'] = resolve(path);
  }
  return out;
}

export default defineConfig({
  plugins: [tailwindcss()],
  // three.js is most of the bundle (~190 kB gzipped); it is loaded once and cached.
  build: { rollupOptions: { input: htmlEntries() }, chunkSizeWarningLimit: 800 },
});
