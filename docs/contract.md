# Contract — interval-merge-core

Pure ESM in `src/intervals.mjs`, zero runtime dependencies, Node >= 22.
Closed intervals `[start, end]` (touching merges); finite numbers only.

| Export | Result |
| --- | --- |
| `MAX_INTERVALS` (100000) | Hard bound. |
| `parseInterval(pair)` | Frozen validated pair. Throws `BAD_SHAPE`/`BAD_NUMBER`/`INVERTED`. |
| `merge(list)` | Sorted, disjoint, minimal cover. |
| `gaps(list, lo, hi)` | Complement within bounds (touching = zero gap). |
| `coverage(list)` | Sum of merged lengths. |

Errors: `BAD_SHAPE` · `BAD_NUMBER` · `INVERTED` · `NOT_ARRAY` ·
`TOO_MANY` · `BAD_BOUNDS`.
