import { difference } from 'lodash'
import { Every } from "../utils"

const a = difference(['a', 'b', 'c', 'd', 'e'], ['a', 'b'], ['c'], ['e'])
//    ^?

const b = difference(['a', 3, 'c', 7, 'e'], ['a', 7])
//    ^?

const c = difference([], ['a', 7])
//    ^?


// ------------------------------------------------------------------------------------------------------------------


type _DifferenceReturn<T extends any[], S> = T["length"] extends 0 
  ? T
  : T extends [infer L, ...infer R]
    ? L extends S
      ? _DifferenceReturn<R, S>
      : [L, ..._DifferenceReturn<R, S>]
    : T[number][]

type DifferenceReturn<T extends any[], S extends any[][]> = _DifferenceReturn<T, S[number][number]>


  
type T0 = DifferenceReturn<['a', 'b', 'c', 'd', 'e'], [['a', 'b'], ['c'], ['e']]>
//   ^?

type T1 = DifferenceReturn<['a', 3, 'c', 7, 'e'], [['a', 7]]>
//   ^?

type T2 = DifferenceReturn<[], [['a', 7]]>
//   ^?

type T3 = DifferenceReturn<string[], (string | number)[][]>
//   ^?


// ------------------------------------------------------------------------------------------------------------------


function difference_typed<
  T extends Every[], 
  V extends [...S[]][], 
  S extends Every
>(array: [...T], ...values: [...V]): DifferenceReturn<T, V> {
  return difference(array, ...values) as any
}


const _a = difference_typed(['a', 3, 'c', 7, 'e'], ['a', 7])
//    ^?

const _b = difference_typed(['a', 'b', 'c', 'd', 'e'], ['a', 'b'], ['c'], ['e'])
//    ^?

const _c = difference_typed(['a', 'b', 'c', 'd', 'e'] as string[], ['a', 'b'], ['c'], ['e'])
//    ^?

const _d = difference_typed(['a', 'b', 'c', 'd', 'e'] as (string | number)[], ['a', 'b'], ['c'], ['e'])
//    ^?

const _e = difference_typed([], ['a', 'b'])
//    ^?