## ⭐ Lodash Wrapper utilizing the full power of TypeScript ⭐ ##

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
```

---

[`concat.ts`](https://github.com/Tobeyyyyy/lodash_typed/blob/master/src/array/concat.ts)

```typescript
import { concat } from "lodash"

const a = concat([0, 1], [2, "a"], "b")
/* const a: (string | number)[] */ ❌
```
```typescript
import { concat } from "lodash_typed"

const a = concat([0, 1], [2, "a"], "b")
/* const a: [0, 1, 2, "a", "b"] */ ✅
```

[`difference.ts`](https://github.com/Tobeyyyyy/lodash_typed/blob/master/src/array/difference.ts)

```typescript
import { difference } from 'lodash'

const a = difference(['a', 3, 'c', 7, 'e'], ['a', 7])
/* const a: (string | number)[] */ ❌
```
```typescript
import { difference } from "lodash_typed"

const a = difference(['a', 3, 'c', 7, 'e'], ['a', 7])
/* const a: [3, "c", "e"] */ ✅
```

[`fill.ts`](https://github.com/Tobeyyyyy/lodash_typed/blob/master/src/array/fill.ts)

```typescript
import { fill } from 'lodash'

const a = fill([1, 2, 3, 4], "a", 1)
/* const a: (string | number)[] */ ❌
```
```typescript
import { fill } from "lodash_typed"

const a = fill([1, 2, 3, 4], "a", 1)
/* const a: [1, "a", "a", "a"] */ ✅
```

[`includes.ts`](https://github.com/Tobeyyyyy/lodash_typed/blob/master/src/collection/includes.ts)

```typescript
import { includes } from 'lodash'

const a = includes([1, 2, 3], 1);
/* const a: boolean */ ❌
const b = includes({ 'a': 1, 'b': 2 }, 1);
/* const b: boolean */ ❌
const c = includes('abcd', 'bc');
/* const c: boolean */ ❌
```
```typescript
import { includes } from "lodash_typed"

const a = includes([1, 2, 3], 1);
/* const a: true */ ✅
const b = includes({ 'a': 1, 'b': 2 }, 1);
/* const b: true */ ✅
const c = includes('abcd', 'bc');
/* const c: true */ ✅
```