import assert from 'node:assert/strict';
import { test } from 'node:test';
import { advanceHeader } from '../app/components/headerScroll.ts';
const initial = { y: 0, travel: 0, hidden: false };

test('keeps stationary and initial floating navigation visible before directional intent', () => {
  assert.equal(advanceHeader(initial, 100, 3000).hidden, false);
  const floating = advanceHeader(initial, 220, 3000);
  assert.equal(floating.hidden, false);
  assert.equal(advanceHeader(floating, 236, 3000).hidden, true);
});
test('reveals promptly on upward travel and avoids toggling on tiny scroll jitter', () => {
  const hidden = advanceHeader(initial, 600, 3000);
  assert.equal(hidden.hidden, true);
  const jitter = advanceHeader(hidden, 598, 3000);
  assert.equal(jitter.hidden, true);
  const visible = advanceHeader(jitter, 596, 3000);
  assert.equal(visible.hidden, false);
  assert.equal(advanceHeader(visible, 630, 3000).hidden, false);
  assert.equal(advanceHeader(visible, 652, 3000).hidden, true);
  assert.deepEqual(advanceHeader(visible, 596, 3000), visible);
});
test('clamps overscroll and restores the complete header near the top', () => {
  const bottom = {y:3000,travel:56,hidden:true};
  assert.deepEqual(advanceHeader(bottom, 3100, 3000), bottom);
  assert.deepEqual(advanceHeader(bottom, -30, 3000), initial);
  assert.equal(advanceHeader(bottom, 170, 3000).hidden, false);
});
