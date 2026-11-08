// SPDX-License-Identifier: MIT
// Closed-interval merge, gaps and coverage over finite numbers.
// Touching intervals merge ([1,2] + [2,3] = [1,3]). No network, no I/O.

export const MAX_INTERVALS = 100000;

export class IntervalError extends Error {
  constructor(code, detail = '') {
    super(detail ? `${code}: ${detail}` : code);
    this.name = 'IntervalError';
    this.code = code;
  }
}

/** Validate one [start, end] pair of finite numbers with start <= end. */
export function parseInterval(pair) {
  if (!Array.isArray(pair) || pair.length !== 2) throw new IntervalError('BAD_SHAPE');
  const [start, end] = pair;
  if (typeof start !== 'number' || typeof end !== 'number' || !Number.isFinite(start) || !Number.isFinite(end)) {
    throw new IntervalError('BAD_NUMBER');
  }
  if (start > end) throw new IntervalError('INVERTED');
  return Object.freeze([start, end]);
}

function parseList(list) {
  if (!Array.isArray(list)) throw new IntervalError('NOT_ARRAY');
  if (list.length > MAX_INTERVALS) throw new IntervalError('TOO_MANY');
  return list.map(parseInterval);
}

/** Merge overlapping/touching intervals; output sorted, disjoint, minimal. */
export function merge(list) {
  const ivs = parseList(list).slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const out = [];
  for (const [s, e] of ivs) {
    const last = out[out.length - 1];
    if (last && s <= last[1]) last[1] = Math.max(last[1], e);
    else out.push([s, e]);
  }
  return Object.freeze(out.map((p) => Object.freeze(p)));
}

/** Complement of the union within [lo, hi]: gaps as closed intervals. */
export function gaps(list, lo, hi) {
  if (typeof lo !== 'number' || typeof hi !== 'number' || !Number.isFinite(lo) || !Number.isFinite(hi) || lo > hi) {
    throw new IntervalError('BAD_BOUNDS');
  }
  const merged = merge(list).filter(([s, e]) => e >= lo && s <= hi);
  // Gaps as [cursor, nextStart]: touching a merged edge means zero gap.
  const out = [];
  let c = lo;
  for (const [s, e] of merged) {
    if (s > c) out.push([c, s]);
    c = Math.max(c, e);
    if (c >= hi) break;
  }
  if (c < hi) out.push([c, hi]);
  return Object.freeze(out.map((p) => Object.freeze(p)));
}

/** Total covered length (sum of end - start over the merged union). */
export function coverage(list) {
  return merge(list).reduce((n, [s, e]) => n + (e - s), 0);
}
