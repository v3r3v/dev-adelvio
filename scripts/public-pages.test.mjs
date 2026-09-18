import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
const home = readFileSync('dist-pages/index.html', 'utf8');
const contact = readFileSync('dist-pages/contact/index.html', 'utf8');
const project = readFileSync('dist-pages/start-project/index.html', 'utf8');
test('all public routes have distinct prerendered content and no pricing or package anchors', () => {
  for (const html of [home, contact, project]) {
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.doesNotMatch(html, /\$\d|#packages|#package-|class="package-grid"/);
    assert.match(html, /theme-init\.js/);
  }
  assert.match(home, /class="quote-bubble"/);
  assert.doesNotMatch(home, /class="inquiry-form"|class="founder-intro"/);
  assert.match(contact, /Jose Rodriguez/);
  assert.match(contact, /<title>Contacto \| Adelvio/);
  assert.match(project, /<title>Comienza un proyecto \| Adelvio/);
  assert.match(project, /class="inquiry-form"/);
  assert.doesNotMatch(project, /class="quote-bubble"/);
});
test('quote route has usable fields, email validation and no GET fallback', () => {
  for (const field of ['name','email','business','idea']) {
    const tag = project.match(new RegExp(`<(?:input|textarea)[^>]*name="${field}"[^>]*>`))?.[0];
    assert.ok(tag && /\brequired\b/.test(tag), `${field} must be required`);
  }
  assert.match(project, /type="email"/);
  assert.match(project, /method="post"/);
  assert.match(project, /value="download"/);
  assert.match(project, /href="[^"]*start-project\//);
  assert.match(contact, /rel="canonical" href="[^"]*contact\//);
});

test('accepted concepts use real routes, truthful labels and keyboard-ready controls', () => {
  assert.match(home, /class="fusion-home"/);
  assert.match(home, /class="aperture-header"/);
  assert.match(home, /data-design="gota"/);
  assert.match(home, /aria-controls="aperture-menu"/);
  assert.match(home, /id="aperture-menu"[^>]*inert=""/);
  assert.match(home, /role="region" aria-roledescription="Carrusel"/);
  assert.match(home, /Conceptos de diseño originales, no proyectos realizados para clientes/);
  const quote = home.match(/<a[^>]*data-design="gota"[^>]*>/)?.[0];
  assert.match(quote, /href="[^\"]*start-project\/\?lang=es"/);
  for (const html of [home,contact,project]) assert.doesNotMatch(html, /localhost|127\.0\.0\.1|lab-tools|lab-controls/);
});
