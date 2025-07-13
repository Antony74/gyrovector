"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberTuple = exports.Tuple = void 0;
class Tuple {
    constructor(tuple) {
        this.tuple = tuple;
    }
    get length() {
        return this.tuple.length;
    }
    at(index) {
        return this.tuple[index];
    }
    static isTuplePrimitive(n, maybeTuple) {
        return Array.isArray(maybeTuple) && maybeTuple.length === n;
    }
    static from(n, maybeTuple) {
        const arr = Array.from(maybeTuple);
        if (Tuple.isTuplePrimitive(n, arr)) {
            return new Tuple(arr);
        }
        else {
            throw new Error(`Tuple.from: Array of length ${n} required to create a ${n}-tuple`);
        }
    }
    // Comment mutable fill method
    // fill(value: T, start: number = 0, end: number = this.tuple.length): this {
    //     if (start < 0) {
    //         start += this.tuple.length;
    //     }
    //     if (end < 0) {
    //         end += this.tuple.length;
    //     }
    //     for (let n = start; n < end; ++n) {
    //         (this.tuple as Array<T>)[n] = value;
    //     }
    //     return this;
    // }
    map(callbackfn, thisArg) {
        const result = this.tuple.map(callbackfn, thisArg);
        return new Tuple(result);
    }
    filter(predicate, thisArg) {
        return this.tuple.filter(predicate, thisArg);
    }
    reduce(callbackfn, initialValue) {
        return this.tuple.reduce(callbackfn, initialValue);
    }
}
exports.Tuple = Tuple;
class NumberTuple extends Tuple {
}
exports.NumberTuple = NumberTuple;
//# sourceMappingURL=tuples.js.map