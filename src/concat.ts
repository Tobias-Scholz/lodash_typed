import { concat } from "lodash"
import { Every } from "./utils"

const a = concat([0, 1], [2, 3])
//    ^?

const b = concat([0, 1], [2, "a"])
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
  ? L extends any[] 
    ? [...L, ..._ConcatReturn<R>]
    : [L, ..._ConcatReturn<R>]
  : []
type ConcatReturn<T extends any[]> = T extends [[]] ? never[] : _ConcatReturn<T>



type T0 = ConcatReturn<[[0, 1], [2, 3]]>
//   ^?

type T1 = ConcatReturn<[[0, 1], [2, "a"]]>
//   ^?

type T2 = ConcatReturn<[[0, 1], [2, "a"], 4]>
//   ^?

type T3 = ConcatReturn<[[]]>
//   ^?

type T4 = ConcatReturn<[2, [3], [[4]]]>
//   ^?

type T5 = ConcatReturn<[string[], string[]]>
//   ^?

type T6 = ConcatReturn<[string[], number[]]>
//   ^?


// ------------------------------------------------------------------------------------------------------------------


function concat_typed<T extends ([...S] | Every )[], S extends Every[]>(...array: [...T]): ConcatReturn<T> {
    return concat(array) as any
}

const _a = concat_typed([0, 1], [2, 3])
//    ^?

const _b = concat_typed([0, 1], [2, "a"])
//    ^?

const _c = concat_typed("a", 2, [3], [[4]])
//    ^?

const _d = concat_typed([])
//    ^?

const _e = concat_typed([], 2)
//    ^?

const _f = concat_typed([] as string[], [] as number[])
//    ^?
