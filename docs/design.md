# Design — interval-merge-core

Sort by start, single sweep: extend on touch-or-overlap, emit otherwise.
Gaps walk the merged cover against the window; coverage sums it. Touch
merges by definition — boundary-sharing intervals are one continuous
span, not two.

Oracle: unsorted overlap, touching pair, empty/singleton edges, clipped
windows, exact complement and length sums. Open/half-open variants are
out of scope by design.
