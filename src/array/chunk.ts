import { chunk } from 'lodash'
import { Every, IfAny, IsAny, Test } from "../utils"

const a = chunk(['a', 'b', 'c', 'd'], 2)
//    ^?

const b = chunk(['a', 'b', 'c', 0], 2)
//    ^?

const c = chunk([], 2)
//    ^?

const d = chunk(['a'], 0)
//    ^?


// ------------------------------------------------------------------------------------------------------------------


type _ChunkReturn<
  T extends any[],
  P extends number,
  I extends any[] = [],
  R extends any[][] = []
> = T['length'] extends 0
  ? [...R, I]
  : T extends [infer First, ...infer Rest]
    ? I['length'] extends P
        ? _ChunkReturn<T, P, [], [...R, I]>
        : _ChunkReturn<Rest, P, [...I, First], R>
    : T[number][][]

type ChunkReturn<T extends any[], P extends number> = 
  IsAny<P> extends true
    ? IsAny<T> extends true 
      ? any[][]
      : T[number][][]
    : IsAny<T> extends true
      ? P extends 0
        ? []
        : any[][]
      : T extends []
        ? []
        : P extends 0 
          ? [] 
          : number extends P 
            ? T[number][][]
            : _ChunkReturn<T, P>
    


type T0 = ChunkReturn<['a', 'b', 'c', 'd'], 2>
//   ^?

type T1 = ChunkReturn<['a', 'b', 'c', 0], 2>
//   ^?

type T2 = ChunkReturn<['a', 'b', 'c', 'd', 'e'], 2>
//   ^?

type T3 = ChunkReturn<['a', 'b', 'c', 'd', 'e'], 3>
//   ^?

type T4 = ChunkReturn<string[], 2>
//   ^?

type T5 = ChunkReturn<(string | number)[], 2>
//   ^?

type T6 = ChunkReturn<[], 2>
//   ^?

type T7 = ChunkReturn<['a', 'b', 'c', 'd', 'e'], 0>
//   ^?

type T8 = ChunkReturn<any[], number>
//   ^?

type T9 = ChunkReturn<any, 0>
//   ^?

type T10 = ChunkReturn<any, number>
//   ^?

type T11 = ChunkReturn<any, any>
//   ^?

type T12 = ChunkReturn<['a', 'b', 'c', 'd', 'e'], number>
//   ^?

type T13 = ChunkReturn<string[], number>
//   ^?

type T14 = ChunkReturn<string[], any>
//   ^?

type T15 = ChunkReturn<['a', 'b', 'c', 'd', 'e'], any>
//   ^?


// ------------------------------------------------------------------------------------------------------------------


function chunk_typed<S extends Every, T extends S[], P extends number = 1>(array: [...T], size?: P): ChunkReturn<T, P> {
  return chunk(array, size) as any
}


const _a = chunk_typed(['a', 'b', 'c', 'd'], 2)
//    ^?

const _b = chunk_typed(['a', 'b', 'c', 0], 2)
//    ^?

const _c = chunk_typed(['a', 'b', 0, 'd', 'e'], 2)
//    ^?

const _d = chunk_typed(['a', 'b', 'c', { a: "1" }, 'e'], 3)
//    ^?

const _e = chunk_typed([] as string[], 2)
//    ^?

const _f = chunk_typed([] as (string | number)[], 2)
//    ^?

const _g = chunk_typed([], 2)
//    ^?

const _h = chunk_typed(['a', 'b', 'c', 'd', 'e'], 0)
//    ^?

const _i = chunk_typed(['a', 'b', 'c', new Test(), 'e'], 2)
//    ^?
