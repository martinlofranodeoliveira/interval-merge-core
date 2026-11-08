# interval-merge-core

Closed-interval merge, gaps and coverage over finite numbers. Zero
runtime dependencies, Node >= 22.

Part of the LOFRANO TECNOLOGIA open-source lab. MIT.

```js
import { merge, gaps } from './src/intervals.mjs';
merge([[5, 8], [1, 3], [2, 4]]); // [[1, 4], [5, 8]]
```

```sh
npm test          # 5 tests, node:test, no dependencies
npm run demo
```

Touching intervals merge; at most 100000. MIT — see `LICENSE`.
[Versão em português](README.pt-BR.md).
