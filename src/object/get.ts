import { get } from "lodash"
import { Every, IfAny, IsAny, IsRecord, IsStringRecord, IsWideString } from "../utils"

var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
const a = get(object, 'a[0].b.c');
//    ^?
//    a = 3
 
const b = get(object, ['a', '0', 'b', 'c']);
//    ^?
//    b = 3
 
const c = get(object, 'a.b.c', 'default');
//    ^?
//    c ='default'

const d = get(object, 'a.0.b.c');
//    ^?
//    a = 3


// ------------------------------------------------------------------------------------------------------------------


type CreatePathArray<S extends string | number> = 
  S extends ""
    ? []
    : S extends `.${infer Rest}`
      ? CreatePathArray<Rest>
      : S extends `[${infer L}]${infer Rest}`
        ? [L, ...CreatePathArray<Rest>]
        : S extends `${infer L}[${infer I}]${infer Rest}`
            ? [...CreatePathArray<L>, I, ...CreatePathArray<Rest>]
            : S extends `${infer L}.${infer Rest}`
              ? [L, ...CreatePathArray<Rest>]
              : [S]
  



type T00 = CreatePathArray<'a.0.b.c'>
//   ^?

type T01 = CreatePathArray<'a.[0].b.c'>
//   ^?

type T02 = CreatePathArray<'a[0]b.c'>
//   ^?

type T03 = CreatePathArray<'a.0.b.c'>
//   ^?

type T04 = CreatePathArray<'a[0].b.c'>
//   ^?

type T05 = CreatePathArray<'a.[0]b.c'>
//   ^?

type T06 = CreatePathArray<'a.[0][1]b.c'>
//   ^?

type T07 = CreatePathArray<'[1].a.b[2]'>
//   ^?

type T08 = CreatePathArray<2>
//   ^?


type _GetReturn<T, P extends (string | number)[], D> = 
  P["length"] extends 0 
    ? T
    : P extends [infer L, ...infer R extends (string | number)[]] 
      ? L extends keyof T
        ? _GetReturn<T[L], R, D> 
        : T extends readonly any[] 
          ? T extends readonly [any, ...any[]] 
            ? D extends never
              ? undefined
              : D
            : any
          : D extends never
            ? undefined
            : D
      : any

type GetReturn<T, P extends readonly (string | number)[] | readonly [(string | number)] | (string | number), D = never> = 
  true extends IsAny<T> | IsAny<P>
    ? any
    : IsRecord<T> extends true 
      ? T extends Record<any, infer TT>
        ? TT | D
        : D extends never
          ? undefined
          : D 
      : _GetReturn<
          T, 
          P extends string | number 
            ? CreatePathArray<P>
            : P extends infer PathArray extends (string | number)[] ? PathArray : never, 
          D
      > 



type T0 = GetReturn<{ 'a': [{ 'b': { 'c': 3 } }] }, 'a.0.b.c'>
//   ^?

type T1 = GetReturn<{ 'a': [{ 'b': { 'c': 3 } }] }, 'a.[0].b.c'>
//   ^?

type T2 = GetReturn<{ 'a': [{ 'b': { 'c': 3 } }] }, 'a[0]b.c'>
//   ^?

type T3 = GetReturn<{ 'a': [{ 'b': { 'c': 3 } }] }, 'a.0.b.c'>
//   ^?

type T4 = GetReturn<{ 'a': [{ 'b': { 'c': 3 } }] }, 'a[0].b.c'>
//   ^?

type T5 = GetReturn<{ 'a': [{ 'b': { 'c': 3 } }] }, 'a.[0]b.c'>
//   ^?

type T6 = GetReturn<{ 'a': [[0, { 'b': { 'c': 3 } }]] }, 'a.[0][1]b.c'>
//   ^?

type T7 = GetReturn<[1, [{a: {b: [0, 1, 2]}}]], '[1][0].a.b[2]'>
//   ^?

type T8 = GetReturn<{ 'a': [{ 'b': { 'c': 3 } }] }, ['a', '0', 'b', 'c']>
//   ^?

type T9 = GetReturn<{ 'a': [{ 'b': { 'c': 3 } }] }, 'a.b.c', 'default'>
//   ^?

type T10 = GetReturn<["a", "b"], '[0]'>
//   ^?

type T11 = GetReturn<[{"a": 1}, "b"], '[0].a'>
//   ^?

type T12 = GetReturn<Record<string, any>, 'a.b.c', 'default'>
//   ^?

type T13 = GetReturn<{}, string, 'default'>
//   ^?

type T14 = GetReturn<Record<string, any>, string, 'default'>
//   ^?

type T15 = GetReturn<any, 'a[0].b.c', 'default'>
//   ^?

type T16 = GetReturn<{}, any, 'default'>
//   ^?

type T17 = GetReturn<any, any, 'default'>
//   ^?

type T18 = GetReturn<[1, 2], "length", 'default'>
//   ^?

type T19 = GetReturn<[1, 2], "push", 'default'>
//   ^?

type T20 = GetReturn<Record<string, string>, "a", 'default'>
//   ^?

type T21 = GetReturn<Record<string, number>, "a", 'default'>
//   ^?

type T22 = GetReturn<Record<number, number>, "a", 'default'>
//   ^?

type T23 = GetReturn<Record<number, number>, string, 'default'>
//   ^?

type T24 = GetReturn<{ a: { b: 0 }[] }, "a[0]", 'default'>
//   ^?

type T25 = GetReturn<{ a: { b: 0 }[] }, string[], 'default'>
//   ^?

type T26 = GetReturn<number[], "a", 'default'>
//   ^?

type T27 = GetReturn<[1, 2, 3], 1, 'default'>
//   ^?

type T28 = GetReturn<{ a: [ { b: 2 } ]}, ["a", 0, "b"], 'default'>
//   ^?


// ------------------------------------------------------------------------------------------------------------------


function typed_get<
  T extends readonly any[] | Record<any, any>, 
  P extends readonly E[] | readonly [E] | E, 
  E extends string | number,
  V extends Every = undefined, 
>(object: T, path: P, defaultValue?: V): GetReturn<T, P, V> {
  return get(object, path as any, defaultValue) as any
}

const _a = typed_get({ 'a': [{ 'b': { 'c': 3 } }] } as const, 'a[0].b.c');
//    ^?
//    a = 3
 
const _b = typed_get({ 'a': [{ 'b': { 'c': 3 } }] } as const, ['a', '0', 'b', 'c']);
//    ^?
//    b = 3
 
const _c = typed_get([0, 2, 3] as const, 'a.b.c', 'default');
//    ^?
//    c ='default'

const _d = typed_get({ 'a': [{ 'b': { 'c': 3 } }] } as const, 'a.0.b.c');
//    ^?
//    a = 3

// @ts-expect-error
const _e = typed_get(34, 'a.0.b.c');
//    ^?

const _f = typed_get([1, 2, 3, 4] as const, 'every');
//    ^?

const _g = typed_get([1, 2, 3, 4] as const, 1);
//    ^?