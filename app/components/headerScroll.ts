/** One pixel of scroll closes/reopens one pixel of header height. No timed easing. */
export type HeaderScroll = { y: number; closed: number };
export const FLOATING_START = 180;
export function advanceHeader(previous: HeaderScroll, rawY: number, maximum: number, height: number): HeaderScroll {
  const y = Math.max(0, Math.min(maximum, rawY));
  const delta = y > previous.y ? y - Math.max(previous.y, FLOATING_START) : y - previous.y;
  return { y, closed: y <= FLOATING_START ? 0 : Math.max(0, Math.min(height, previous.closed + delta)) };
}
