import assert from 'node:assert/strict';
import { test } from 'node:test';
import { advanceHeader } from '../app/components/headerScroll.ts';
const initial = { y: 0, closed: 0 };
test('stationary, floating, then one-to-one height closure', () => {
  assert.equal(advanceHeader(initial, 100, 3000, 88).closed, 0);
  const half = advanceHeader(initial, 224, 3000, 88);
  assert.equal(half.closed, 44);
  assert.equal(advanceHeader(half, 234, 3000, 88).closed, 54);
  assert.equal(advanceHeader(half, 224, 3000, 88).closed, 44);
});
test('upward travel reverses closure by exactly the same distance', () => {
  const closed = advanceHeader(initial, 600, 3000, 88);
  assert.equal(closed.closed, 88);
  const reopened = advanceHeader(closed, 578, 3000, 88);
  assert.equal(reopened.closed, 66);
  assert.equal(advanceHeader(reopened, 588, 3000, 88).closed, 76);
  assert.equal(advanceHeader(reopened, 512, 3000, 88).closed, 0);
});
test('mobile height, viewport limits and overscroll are clamped', () => {
  assert.equal(advanceHeader(initial, 700, 3000, 76).closed, 76);
  assert.deepEqual(advanceHeader({y:3000,closed:88}, 3100, 3000, 88), {y:3000,closed:88});
  assert.deepEqual(advanceHeader({y:200,closed:20}, -30, 3000, 88), initial);
});
