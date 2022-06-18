import { includes } from "lodash"
import { Decrement, Increment, IsNegative, Abs } from "../utils"

const a = includes([1, 2, 3], 1);
//    a = true
 
const b = includes([1, 2, 3], 1, 2);
//    b = false
 
const c = includes({ 'a': 1, 'b': 2 }, 1);
//    c = true
 
const d = includes('abcd', 'bc');
//    d = true


// ------------------------------------------------------------------------------------------------------------------


type ConvertNegativeIndex<L extends number, I extends string> = I extends "0"
  ? L
  : ConvertNegativeIndex<Decrement<L>, `${Decrement<I> & number}`>

type StringLength<T extends string, I extends number = 0> = T extends `${string}${infer Rest}`
  ? Rest extends ""
    ? Increment<I>
    : StringLength<Rest, Increment<I>>
  : 0

type IncludesArray<T extends any[], V, S extends number = 0, I extends number = 0> = T["length"] extends 0
  ? false
  : T extends [infer L, ...infer Rest] 
    ? I extends S 
      ? L extends V
        ? true
        : IncludesArray<Rest, V, S, I>
      : IncludesArray<Rest, V, S, Increment<I>>
    : never

type IncludesObject<T, V> = V extends T[keyof T] ? true : false

type IncludesString<T extends string, V extends string, S extends number = 0, I extends number = 0> = T extends `${string}${infer Rest}`
  ? Rest extends ""
    ? false
    : I extends S
      ? T extends `${string}${V}${string}` ? true : false
      : IncludesString<Rest, V, S, Increment<I>>
  : never

type Includes<T extends Record<string, any> | any[] | string, V, S extends number = 0> = T extends any[] 
  ? IncludesArray<
      T, 
      V, 
      IsNegative<S> extends true 
        ? ConvertNegativeIndex<T["length"], `${Abs<S>}`> extends infer SI extends number 
          ? SI 
          : never 
        : S
    >
  : T extends string 
    ? IncludesString<
        T, 
        V & string, 
        IsNegative<S> extends true 
          ? ConvertNegativeIndex<StringLength<T>, `${Abs<S>}`> extends infer SI extends number 
            ? SI 
            : never 
          : S
      >
    : IncludesObject<T, V>


type T0 = Includes<[1, 2, 3], 1>
//   ^?

type T1 = Includes<[2, 1, 3], 1, 2>
//   ^?

type T2 = Includes<[2, 1, 1], 1, 2>
//   ^?

type T3 = Includes<{ 'a': 1, 'b': 2 }, 1>
//   ^?

type T4 = Includes<{ 'a': 1, 'b': 2 }, 3>
//   ^?

type T5 = Includes<'abcd', 'bc'>
//   ^?

type T6 = Includes<'abcd', 'bc', 2>
//   ^?

type T7 = Includes<'abcd', 'bc', 1>
//   ^?

type T8 = Includes<[1, 2, 3, 4], 2, -2>
//   ^?

type T9 = Includes<[1, 2, 3, 4], 2, -3>
//   ^?

type T10 = Includes<'abcd', 'bc', -2>
//   ^?

type T11 = Includes<'abcd', 'bc', -3>
//   ^?
