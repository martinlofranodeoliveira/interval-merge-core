import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { merge, gaps, coverage, IntervalError } from '../src/intervals.mjs';

describe('merge', () => {
  it('merges overlaps, touches and unsorted input', () => {
    assert.deepEqual(merge([[5, 8], [1, 3], [2, 4], [8, 10]]), [[1, 4], [5, 10]]);
    assert.deepEqual(merge([[1, 2], [2, 3]]), [[1, 3]]);
    assert.deepEqual(merge([]), []);
    assert.deepEqual(merge([[3, 3]]), [[3, 3]]);
  });
  it('rejects inverted, non-numbers and bad shapes', () => {
    assert.throws(() => merge([[5, 1]]), (e) => e.code === 'INVERTED');
    assert.throws(() => merge([['a', 1]]), (e) => e.code === 'BAD_NUMBER');
    assert.throws(() => merge([[1]]), (e) => e.code === 'BAD_SHAPE');
    assert.ok(new IntervalError('X') instanceof Error);
  });
});

describe('gaps and coverage', () => {
  it('finds the complement within bounds', () => {
    assert.deepEqual(gaps([[1, 2], [5, 6]], 0, 8), [[0, 1], [2, 5], [6, 8]]);
    assert.deepEqual(gaps([], 0, 5), [[0, 5]]);
    assert.deepEqual(gaps([[0, 10]], 0, 10), []);
    assert.deepEqual(gaps([[20, 30]], 0, 10), [[0, 10]]);
  });
  it('clips to bounds and rejects bad bounds', () => {
    assert.deepEqual(gaps([[-5, 3], [8, 99]], 0, 10), [[3, 8]]);
    assert.throws(() => gaps([], 5, 1), (e) => e.code === 'BAD_BOUNDS');
  });
  it('sums merged lengths', () => {
    assert.equal(coverage([[1, 3], [2, 4], [10, 12]]), 5);
    assert.equal(coverage([]), 0);
  });
});
