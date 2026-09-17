import assert from 'node:assert/strict';
import { test } from 'node:test';
import { advanceHeader } from '../app/components/headerScroll.ts';

const initial = { y: 0, compact: false, hidden: false, travel: 0, visibleSince: 0 };
test('a fast fling passes through a visible floating stage before hiding', () => {
  const floating = advanceHeader(initial, 100, 3000, 0).state;
  const fling = advanceHeader(floating, 500, 3000, 40);
  assert.equal(fling.state.hidden, false);
  assert.equal(fling.wakeAfter, 380);
  assert.equal(advanceHeader(fling.state, 500, 3000, 420).state.hidden, true);
  const singleJump = advanceHeader(initial, 500, 3000, 0);
  assert.equal(singleJump.wakeAfter, 420);
  assert.equal(advanceHeader(singleJump.state, 500, 3000, 420).state.hidden, true);
});
test('upward scroll reveals immediately, and small reversals do not dismiss it', () => {
  const hidden = { ...initial, y: 600, compact: true, hidden: true, travel: 400 };
  const revealed = advanceHeader(hidden, 599, 3000, 800).state;
  assert.equal(revealed.hidden, false);
  assert.equal(advanceHeader(revealed, 607, 3000, 1500).state.hidden, false);
  assert.equal(advanceHeader(revealed, 660, 3000, 900).state.hidden, false);
  assert.equal(advanceHeader(revealed, 660, 3000, 1220).state.hidden, true);
});
test('top reset and rubber-band overscroll are clamped', () => {
  const state = { ...initial, y: 3000, compact: true, hidden: true, travel: 500 };
  assert.equal(advanceHeader(state, 3100, 3000, 1000).state.y, 3000);
  const reset = advanceHeader(state, -30, 3000, 1000).state;
  assert.equal(reset.y, 0);
  assert.equal(reset.compact, false);
  assert.equal(reset.hidden, false);
});
