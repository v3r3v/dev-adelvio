/** Directional intent triggers the split; CSS owns the reversible animation. */
export type HeaderScroll = { y: number; travel: number; hidden: boolean };
export const FLOATING_START = 180;
export function advanceHeader(previous: HeaderScroll, rawY: number, maximum: number): HeaderScroll {
  const y = Math.max(0, Math.min(maximum, rawY));
  if (y <= FLOATING_START) return { y, travel: 0, hidden: false };
  const delta = y - Math.max(previous.y, FLOATING_START);
  if (!delta) return { ...previous, y };
  const travel = Math.sign(delta) === Math.sign(previous.travel) ? previous.travel + delta : delta;
  return { y, travel: Math.max(-56, Math.min(56, travel)), hidden: travel >= 56 ? true : travel <= -4 ? false : previous.hidden };
}
