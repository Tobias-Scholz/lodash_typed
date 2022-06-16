## ⭐ Lodash Wrapper utilizing the full power of TypeScript ⭐ ##

---

Lodash is a great library for JavaScript utility functions. The typings provided by `@types/lodash` are fine for everyday usage. Yet, there is much room for improvement.

```typescript
import { chunk } from 'lodash'

const a = chunk(['a', 'b', 'c', 'd'], 2)
// const a: string[][]
```

The type of `a` is `string[][]`? Yes, but we know better.

```typescript
import { chunk } from 'lodash-typed'

const _a = chunk(['a', 'b', 'c', 'd'], 2)
// const _a: [["a", "b"], ["c", "d"]]

const _b = chunk(['a', 'b', 0, 'd', 'e'], 2)
// const _b: [["a", "b"], [0, "d"], ["e"]]

const _c = chunk([] as string[], 2)
// const _c: string[][]