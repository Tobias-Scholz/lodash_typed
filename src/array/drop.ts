import { drop } from "lodash"
import { Every, IfAny, Increment } from "../utils"

const a = drop([1, 2, 3])
//    ^?
 
const b = drop([1, 2, 3], 2)
//    ^?

const c = drop([1, 2, 3], 5)
//    ^?
 
const d = drop([1, 2, 3], 0)
//    ^?

const e = drop([], 0)
//    ^?

const f = drop([1, 2, "a"], 2)
//    ^?


// ------------------------------------------------------------------------------------------------------------------


type _DropReturn<
  T extends any[], 
  N extends number, 
  S extends number = 0
> =  S extends N
  ? T
  : T extends [any, ...infer R]
    ? _DropReturn<R, N, Increment<S>>
    : []

type DropReturn<T extends any[], N extends number = 1> = 
 IfAny<
  T,
  any[],   
  T["length"] extends 0 
    ? [] 
    : T extends [any, ...any[]] 
      ? number extends N 
        ? T[number][]
        : _DropReturn<T, N>
      : T
  >



type T0 = DropReturn<[1, 2, 3]> 
//   ^?

type T1 = DropReturn<[1, 2, 3, "a"], 2> 
//   ^?

type T2 = DropReturn<[1, 2, 3, 4], 5> 
//   ^?

type T3 = DropReturn<[], 0> 
//   ^?

type T4 = DropReturn<number[], 0> 
//   ^?

type T5 = DropReturn<(number | string)[], 0> 
//   ^?

type T6 = DropReturn<any[], 0> 
//   ^?

type T7 = DropReturn<any, 0> 
//   ^?

type T8 = DropReturn<[1, 2, 3, 4], number> 
//   ^?

type T9 = DropReturn<[1, 2, 3, 4], any> 
//   ^?

type T10 = DropReturn<any, any> 
//   ^?

// ------------------------------------------------------------------------------------------------------------------


function drop_typed<T extends E[], E extends Every, N extends number = 1>(array: [...T], n?: N): DropReturn<T, N> {
  return drop(array, n) as any
}


const _a = drop_typed([1, 2, 3])
//    ^?
 
const _b = drop_typed([1, 2, 3], 2)
//    ^?

const _c = drop_typed([1, 2, 3], 5)
//    ^?
 
const _d = drop_typed([1, 2, 3], 0)
//    ^?

const _e = drop_typed([], 0)
//    ^?

const _f = drop_typed([1, 2, "a"], 1)
//    ^?

const _g = drop_typed([] as number[], 2)
//    ^?

const _h = drop_typed([] as (number | string)[], 2)
//    ^?