import { assert, Equals } from "tsafe"

type LessThen<N1 extends number, N2 extends number> = N1

export type Every =
  | null
  | string
  | number
  | boolean
  | Array<Every>
  | object
  | undefined
  | {
      [prop: string]: Every
    }


type DecrementTable = [
  -1,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50
]

export type Decrement<T extends number | string> = DecrementTable[T & keyof DecrementTable]

export type Increment<T extends number> = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50
][T]

export type Abs<T extends number> = `${T}` extends `-${infer R}` ? R : never

export type IsNegative<T extends number> = `${T}` extends `-${number}` ? true : false


export class Test {
  a!: string

  constructor() {}
}
