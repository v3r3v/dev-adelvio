/** Direction changes reveal immediately; dismissal waits for deliberate travel. */
export type HeaderScroll = { y: number; compact: boolean; hidden: boolean; travel: number; visibleSince: number };
export const FLOATING_HOLD_MS = 420;
export function advanceHeader(previous: HeaderScroll, rawY: number, maximum: number, now: number) {
  const y = Math.max(0, Math.min(maximum, rawY));
  const delta = y - previous.y;
  const compact = y > 52;
  const reveal = delta < 0 || !compact || !previous.compact;
  const visibleSince = reveal ? now : previous.visibleSince;
  const travel = reveal ? (!previous.compact && compact ? Math.max(0, y - 52) : 0) : previous.travel + Math.max(0, delta);
  const eligible = compact && y > 220 && travel >= 48;
  const remaining = Math.max(0, FLOATING_HOLD_MS - (now - visibleSince));
  return {
    state: { y, compact, hidden: eligible && remaining === 0, travel, visibleSince },
    wakeAfter: eligible && remaining > 0 ? remaining : 0,
  };
}
