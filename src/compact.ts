import { compact } from "lodash"
import { Every } from "./utils"

const a = compact([0, 1, false, 2, '', 3])
//    ^?

const b = compact([0, 1, false, 2, '', 3, NaN, "a"])
//    ^?

const c = compact([])
//    ^?


// ------------------------------------------------------------------------------------------------------------------


/*
 * Ideally, when compact is called with the following tuple:
 */

const __a = compact([0, 1, false, 2, '', 3, NaN, "a"])

/*
 * The resulting type should be
 */

type __A = [1, 2, 3, "a"]

/*
 * But since NaN is still just a number in TypeScript, there is no way to detect a NaN in a tuple.
 * To solve this, we have to wait until this TypeScript proposal is implemented:
 * https://github.com/Microsoft/TypeScript/issues/28682
 */


// ------------------------------------------------------------------------------------------------------------------

/*
 * We can still create a type that filters 0, false, undefined, null and '':
 */

type Falsey = 0 | false | undefined | null | ''

type _CompactReturn<T extends any[]> = T["length"] extends 0 
  ? T
  : T extends [infer L, ...infer R]
    ? L extends Falsey
      ? _CompactReturn<R>
      : [L, ..._CompactReturn<R>]
    : never
type CompactReturn<T extends any[]> = T["length"] extends 0 ? never[] : _CompactReturn<T>

type T0 = CompactReturn<[0, 1, false, 2, '', 'a', undefined, 'b', null, 3]>
//   ^?

type T1 = CompactReturn<[]>
//   ^?


// ------------------------------------------------------------------------------------------------------------------


function compact_typed<S extends Every, T extends S[]>(array: [...T]) : CompactReturn<T> {
    return compact(array) as any
}

const _a = compact_typed([0, 1, false, 2, '', 'a', undefined, 'b', null, 3])
//    ^?

const _b = compact_typed([])
//    ^?