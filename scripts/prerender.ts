import {createServer, type Plugin, type ResolvedConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {createElement} from 'react';
import {renderToString} from 'react-dom/server';
import {fileURLToPath} from 'node:url';

/** Render the same React page at build time; hosting remains entirely static. */
export function prerenderHome(): Plugin {
  let config: ResolvedConfig;
  return {
    name: 'adelvio-prerender-home',
    apply: 'build',
    enforce: 'post',
    configResolved(resolved) { config = resolved; },
    async generateBundle(_, bundle) {
      const document = bundle['index.html'];
      if (!document || document.type !== 'asset') throw new Error('Missing homepage build output');
      const renderer = await createServer({
        configFile: false,
        root: fileURLToPath(new URL('../', import.meta.url)),
        plugins: [react()],
        server: {middlewareMode: true, watch: null},
        appType: 'custom',
        ssr: {external: ['react', 'react-dom']},
      });
      try {
        const {default: Home} = await renderer.ssrLoadModule('/app/page.tsx');
        const html = String(document.source);
        if (!html.includes('<div id="root"></div>')) throw new Error('Missing homepage render target');
        for (const [page, slug, title] of [['home', '', ''], ['contact', 'contact', 'Contacto'], ['project', 'start-project', 'Comienza un proyecto']] as const) {
          const markup = renderToString(createElement(Home, {assetBase: config.base, page}));
          let output = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
          if (!slug) { document.source = output; continue; }
          output = output.replace(/<title>[^<]*<\/title>/, `<title>${title} | Adelvio</title>`)
            .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*(")/g, `$1${title} | Adelvio$2`)
            .replace(/(<link rel="canonical" href=")([^"]+)(")/, `$1$2${slug}/$3`)
            .replace(/(<meta property="og:url" content=")([^"]+)(")/, `$1$2${slug}/$3`);
          this.emitFile({type: 'asset', fileName: `${slug}/index.html`, source: output});
        }
      } finally {
        await renderer.close();
      }
    },
  };
}
