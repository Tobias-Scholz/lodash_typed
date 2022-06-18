import { curry } from "lodash"

var abc = function(a: number, b: number, c: number) {
    return [a, b, c];
};
   
var curried = curry(abc, 2);
   
const res = curried(1, 2)(3);
// => [1, 2, 3]


// ------------------------------------------------------------------------------------------------------------------


type CurryReturn<T extends (...args: any[]) => any> = Parameters<T>["length"] extends 0
  ? ReturnType<T>
  : Parameters<T> extends [any, ...infer Rest] 
    ? (arg: Parameters<T>[0]) => CurryReturn<(...args: Rest) => ReturnType<T>>
    : never


type T0 = CurryReturn<(a: number) => number>
//   ^?

type T1 = CurryReturn<(a: number, b: number) => number[]>
//   ^?

type T2 = CurryReturn<(a: number, b: number, c: number, d: number, e: number, f: number) => number[]>
//   ^?