import { fill } from "lodash";
import { Abs, ConvertNegativeIndex, Decrement, Every, Increment, IsNegative } from "../utils"

const a = fill([1, 2, 3], "a")
//    ^?

const b = fill([], "a")
//    ^?

const c = fill([1, 2, 3, 4], "a", 1)
//    ^?
//    c = [1, "a", "a", "a"]

const d = fill([1, 2, 3, 4, 5, 6], "a", 1, 3)
//    ^?
//    d = [1, "a", "a", 4, 5, 6]

const e = fill([1, 2, 3, 4, 5, 6], "a", 1, 1)
//    ^?
//    d = [1, 2, 3, 4, 5, 6]

const f = fill([1, 2, 3, 4, 5, 6], "a", -4, -1)
//    ?
//    f = [1, 2, "a", "a", "a", 6]


// ------------------------------------------------------------------------------------------------------------------


type _FillReturn<
  T extends any[], 
  C, 
  S extends number, 
  E extends number, 
  I extends number = 0, 
  F extends boolean = false
> = T["length"] extends 0 
  ? []
  : T extends [infer First, ...infer Rest] 
      ? I extends S
        ? I extends E 
            ? [First, ..._FillReturn<Rest, C, S, E, Increment<I>, false>]
            : [C, ..._FillReturn<Rest, C, S, E, Increment<I>, true>]
        : F extends true 
            ? I extends E 
                ? [First, ..._FillReturn<Rest, C, S, E, Increment<I>, false>]
                : [C, ..._FillReturn<Rest, C, S, E, Increment<I>, true>]
            : [First, ..._FillReturn<Rest, C, S, E, Increment<I>, false>]
      : never
      
    
 
type FillReturn<T extends any[], C, S extends number = 0, E extends number = T["length"]> = T extends [any, ...any[]]
  ? _FillReturn<
      T, 
      C, 
      ConvertNegativeIndex<T, S>,
      ConvertNegativeIndex<T, E>
    >
  : T


type T0 = FillReturn<[1, 2, 3], "a">
//   ^?

type T1 = FillReturn<[], "a">
//   ^?

type T2 = FillReturn<[1, 2, 3, 4], "a", 1>
//   ^?

type T3 = FillReturn<[1, "b", 3, 4], "a", 2>
//   ^?

type T4 = FillReturn<[1, 2, 3, 4], "a", 7>
//   ^?

type T5 = FillReturn<[1, 2, 3, 4, 5, 6], "a", 1, 3>
//   ^?

type T6 = FillReturn<[1, 2, 3, 4, 5, 6], "a", 1, 1>
//   ^?

type T7 = FillReturn<[1, 2, 3, 4, 5, 6], "a", -4, -2>
//   ^?

type T8 = FillReturn<[1, 2, 3, 4, 5, 6], "a", -4>
//   ^?

type T9 = FillReturn<number[], "a", -4>
//   ^?

type T10 = FillReturn<(number | string)[], "a", -4>
//   ^?

type T11 = FillReturn<any[], "a">
//   ^?


// ------------------------------------------------------------------------------------------------------------------


function fill_typed<
  TT extends Every, 
  T extends TT[], 
  C extends Every, 
  S extends number = 0, 
  E extends number = T["length"]
>(array: [...T], value: C, start?: S, end?: E) : FillReturn<T, C, S, E> {
  return fill(array, value, start, end) as any
}


const _a = fill_typed([1, 2, 3, 4], "a", 1)
//    ^?

const _b = fill_typed([1, 2, 3, 4, 5, 6], "a", -4, -2)
//    ^?

const _c = fill_typed([] as (number | string)[], "a", -4)
//    ^?

const _d = fill_typed([1, "b", 3, 4], "a", 2)
//    ^?

const _e = fill_typed([1, 2, 3, 4, 5, 6], "a", 1, 3)
//    ^?

const _f = fill_typed([], "a", 1, 3)
//    ^?