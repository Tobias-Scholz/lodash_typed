import { concat } from "lodash"
import { Every, IfAny, IsAny } from "../utils"

const a = concat([0, 1], [2, 3])
//    ^?

const b = concat([0, 1], [2, "a"], "b")
//    ^?

// @ts-ignore
const c = concat(1, 2, [3], [[4]])
//    ^?

const d = concat([])
//    ^?

const e = concat([], 2)
//    ^?


// ------------------------------------------------------------------------------------------------------------------


type _ConcatReturn<T extends any[]> = T extends [infer L, ...infer R]
  ? L extends readonly any[] 
    ? [...L, ..._ConcatReturn<R>]
    : [L, ..._ConcatReturn<R>]
  : []

type ConcatReturn<T extends any[]> = 
  IfAny<
    {
      [K in keyof T]: { [K2 in keyof T[K]]: T[K][K2] }[keyof T[K] & `${bigint}`]
    }[keyof T & `${bigint}`] | T, 
    any[], 
    _ConcatReturn<T>
  >


type T0 = ConcatReturn<[[0, 1], [2, 3]]>
//   ^?

type T1 = ConcatReturn<[[0, 1], [2, "a"]]>
//   ^?

type T2 = ConcatReturn<[[0, "b"], [2, "a"], 4]>
//   ^?

type T3 = ConcatReturn<[[]]>
//   ^?

type T4 = ConcatReturn<[2, [3], [[4]]]>
//   ^?

type T5 = ConcatReturn<[string[], string[]]>
//   ^?

type T6 = ConcatReturn<[string[], number[]]>
//   ^?

type T7 = ConcatReturn<[any[], number[]]>
//   ^?

type T8 = ConcatReturn<[any, number[]]>
//   ^?

type T9 = ConcatReturn<any>
//   ^?

type T10 = ConcatReturn<[readonly [0, "b"], readonly [2, "a"], 4]>
//   ^?


// ------------------------------------------------------------------------------------------------------------------


function concat_typed<T extends ([...S] | Every )[], S extends Every[]>(...array: [...T]): ConcatReturn<T> {
    return concat(array) as any
}


const _a = concat_typed([0, 1], [2, 3])
//    ^?

const _b = concat_typed([0, 1], [2, "a"], "b")
//    ^?

const _c = concat_typed("a", 2, [3], [[4]])
//    ^?

const _d = concat_typed([])
//    ^?

const _e = concat_typed([], 2)
//    ^?

const _f = concat_typed([] as string[], [] as number[])
//    ^?

const _g = concat_typed([] as any[], [] as number[])
//    ^?

const _h = concat_typed([] as any)
//    ^?
