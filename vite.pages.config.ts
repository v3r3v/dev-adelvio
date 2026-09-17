import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import {fileURLToPath} from 'node:url';
import {prerenderHome} from './scripts/prerender';

// Each repository gets its own Pages URLs; Cloudflare builds do not set this variable.
const pagesRepository = process.env.PAGES_REPOSITORY || 'v3r3v/adelvio';
if (!/^[A-Za-z0-9-]+\/[A-Za-z0-9_.-]+$/.test(pagesRepository)) {
  throw new Error('PAGES_REPOSITORY must be owner/repository.');
}
const [owner, repository] = pagesRepository.split('/');
const base = `/${repository}/`;
const pagesUrl = `https://${owner}.github.io${base}`;

export default defineConfig({
  root: fileURLToPath(new URL('./pages/', import.meta.url)),
  base,
  publicDir: fileURLToPath(new URL('./public/', import.meta.url)),
  plugins: [react(), prerenderHome(), {
    name: 'repository-preview-address',
    transformIndexHtml(html) {
      const result = html.replaceAll('https://v3r3v.github.io/adelvio/', pagesUrl);
      return repository === 'dev-adelvio'
        ? result.replace('</head>', '<meta name="robots" content="noindex, nofollow" /></head>')
        : result;
    },
  }],
  css: {postcss: {plugins: [tailwindcss()]}},
  build: {
    rollupOptions: {input: {home: fileURLToPath(new URL('./pages/index.html', import.meta.url)), portal: fileURLToPath(new URL('./pages/portal/index.html', import.meta.url))}},
    outDir: fileURLToPath(new URL('./dist-pages/', import.meta.url)),
    emptyOutDir: true,
  },
});
