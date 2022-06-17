import { dropRight } from "lodash"
import { Every, Increment } from "../utils"

const a = dropRight([1, 2, 3])
//    ^?
 
const b = dropRight([1, 2, 3], 2)
//    ^?

const c = dropRight([1, 2, 3], 5)
//    ^?
 
const d = dropRight([1, 2, 3], 0)
//    ^?

const e = dropRight([], 0)
//    ^?

const f = dropRight([1, 2, "a"], 2)
//    ^?


// ------------------------------------------------------------------------------------------------------------------


type _DropRightReturn<
  T extends any[], 
  N extends number, 
  S extends number = 0
> =  S extends N
  ? T
  : T extends [...infer L, any]
    ? _DropRightReturn<L, N, Increment<S>>
    : []

type DropRightReturn<T extends any[], N extends number = 1> = T["length"] extends 0 
  ? [] 
  : T extends [any, ...any[]] 
    ? _DropRightReturn<T, N>
    : T



type T0 = DropRightReturn<[1, 2, 3]> 
//   ^?

type T1 = DropRightReturn<["a", 2, 3, "a"], 2> 
//   ^?

type T2 = DropRightReturn<[1, 2, 3, 4], 5> 
//   ^?

type T3 = DropRightReturn<[], 0> 
//   ^?

type T4 = DropRightReturn<number[], 0> 
//   ^?

type T5 = DropRightReturn<(number | string)[], 0> 
//   ^?


// ------------------------------------------------------------------------------------------------------------------


function dropRight_typed<T extends E[], E extends Every, N extends number = 1>(array: [...T], n?: N): DropRightReturn<T, N> {
  return dropRight(array, n) as any
}


const _a = dropRight_typed([1, 2, 3])
//    ^?
 
const _b = dropRight_typed([1, 2, 3], 2)
//    ^?

const _c = dropRight_typed([1, 2, 3], 5)
//    ^?
 
const _d = dropRight_typed([1, 2, 3], 0)
//    ^?

const _e = dropRight_typed([], 0)
//    ^?

const _f = dropRight_typed([1, 2, "a"], 1)
//    ^?

const _g = dropRight_typed([] as number[], 2)
//    ^?

const _h = dropRight_typed([] as (number | string)[], 2)
//    ^?