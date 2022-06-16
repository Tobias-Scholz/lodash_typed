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

export class Test{
    a!: string

    constructor(){}
}