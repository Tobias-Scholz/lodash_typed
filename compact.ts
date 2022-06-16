import { compact } from "lodash"

const a = compact([0, 1, false, 2, '', 3])
//    ^?

const b = compact([0, 1, false, 2, '', 3, NaN, "a"])
//    ^?

// ------------------------------------------------------------------------------------------------------------------

/*
 * Ideally, when compact is called with the following tuple:
 */

const c = compact([0, 1, false, 2, '', 3, NaN, "a"])

/*
 * The resulting type should be
 */

type C = [1, 2, 3, "a"]

/*
 * But since NaN is still just a number in TypeScript, there is no way to detect a NaN in a tuple.
 * To solve this, we have to wait until this TypeScript proposal is implemented:
 * https://github.com/Microsoft/TypeScript/issues/28682
 */