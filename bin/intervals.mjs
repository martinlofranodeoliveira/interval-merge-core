#!/usr/bin/env node
// Demo: fixed merge/gaps, asserts exact output. --assert exits non-zero on mismatch.
import { merge, gaps, coverage } from '../src/intervals.mjs';

let failed = 0;
const m = merge([[5, 8], [1, 3], [2, 4], [8, 10]]);
const pass1 = JSON.stringify(m) === JSON.stringify([[1, 4], [5, 10]]);
console.log(`${pass1 ? 'PASS' : 'FAIL'} merge -> ${JSON.stringify(m)}`);
if (!pass1) failed++;
const g = gaps([[1, 2], [5, 6]], 0, 8);
const pass2 = JSON.stringify(g) === JSON.stringify([[0, 1], [2, 5], [6, 8]]);
console.log(`${pass2 ? 'PASS' : 'FAIL'} gaps -> ${JSON.stringify(g)}`);
if (!pass2) failed++;
const c = coverage([[1, 3], [2, 4], [10, 12]]);
console.log(`${c === 5 ? 'PASS' : 'FAIL'} coverage -> ${c}`);
if (c !== 5) failed++;
if (process.argv.includes('--assert') && failed > 0) process.exit(1);
if (failed > 0) process.exitCode = 1;
console.log(failed === 0 ? 'demo: all cases as expected' : `demo: ${failed} mismatch(es)`);
