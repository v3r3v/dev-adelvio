// Scope the accepted laboratory composition; public routes and portal keep their CSS.
import {readFileSync, writeFileSync} from 'node:fs';
import postcss from 'postcss';
const source = '../outputs/ui-lab/homepage/v2/';
const used = new Set(readFileSync('app/components/FusionHome.tsx','utf8').match(/fh-[a-z-]+/g));
const css = postcss.parse(readFileSync(source+'base.css','utf8')+'\n'+readFileSync(source+'refine.css','utf8'));
css.walkRules(rule => {
  if (rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
  rule.selectors = rule.selectors.map(selector => {
    selector = selector.replace(/\.([a-zA-Z_][\w-]*)/g, (_,name) => name === 'fusion' ? '.fusion-home' : '.fh-'+name);
    selector = selector.replace(/:root|(?<![\w.-])(?:body|html)(?![\w-])/g,'.fusion-home');
    return selector.startsWith('.fusion-home') ? selector : '.fusion-home '+selector;
  });
  const relevant = rule.selectors.filter(selector => [...selector.matchAll(/\.(fh-[\w-]+)/g)].every(match => used.has(match[1])));
  if (relevant.length) rule.selectors = relevant;
  else rule.remove();
});
css.walkDecls(decl => {
  decl.value = decl.value.replace(/\bDM\b/g,'AdelvioDM').replace(/\bCormorant\b/g,'AdelvioCormorant')
    .replaceAll('assets/dm-sans.woff2','/fonts/adelvio-dm-sans.woff2')
    .replaceAll('assets/cormorant.woff2','/fonts/adelvio-cormorant.woff2')
    .replaceAll('assets/cormorant-italic.woff2','/fonts/adelvio-cormorant-italic.woff2');
});
writeFileSync('app/fusion-home.css','/* Scoped from the accepted Secuencia x Giro v2 local lab. */\n'+css.toString().trimEnd()+'\n');
