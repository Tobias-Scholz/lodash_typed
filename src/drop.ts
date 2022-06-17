import { drop } from "lodash"
import { Increment } from "./utils"

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

type DropReturn<T extends any[], N extends number = 1> = T["length"] extends 0 
  ? [] 
  : T extends [any, ...any[]] 
    ? _DropReturn<T, N>
    : T



type T0 = DropReturn<[1, 2]> 
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


// ------------------------------------------------------------------------------------------------------------------