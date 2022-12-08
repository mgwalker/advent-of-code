/**
 * Util root. Import with:
 *    import util from "utils";
 */
import CountingSet from "counting-set";

const toNumbers = (value) => +value;

const product = (total, value) => total * value;
const sum = (total, value) => total + value;

export { CountingSet, toNumbers, product, sum };
