/* eslint-disable @typescript-eslint/no-explicit-any */
type _TupleOf<T, N extends number, R extends T[]> = R['length'] extends N
    ? R
    : _TupleOf<T, N, [T, ...R]>;

export type TuplePrimitive<T, N extends number> = _TupleOf<T, N, []> & {
    length: N;
    [Symbol.iterator](): ArrayIterator<T>;
};

export class Tuple<T, N extends number> {
    tuple: TuplePrimitive<T, N>;

    constructor(...tuplePrimitive: TuplePrimitive<T, N>) {
        this.tuple = tuplePrimitive;
    }

    get length(): number {
        return this.tuple.length;
    }

    static isTuplePrimitive<T, N extends number>(
        n: number,
        maybeTuple: { length: number },
    ): maybeTuple is TuplePrimitive<T, N> {
        return Array.isArray(maybeTuple) && maybeTuple.length === n;
    }

    static from<T, N extends number>(
        n: number,
        maybeTuple: { length: number },
    ): Tuple<T, N> {
        const arr = Array.from<T>(maybeTuple);
        if (Tuple.isTuplePrimitive<T, N>(n, arr)) {
            return new Tuple<T, N>(...(arr as any));
        } else {
            throw new Error(
                `Tuple.from: Array of length ${n} required to create a ${n}-tuple`,
            );
        }
    }

    fill(value: T, start: number = 0, end: number = this.tuple.length): this {
        if (start < 0) {
            start += this.tuple.length;
        }

        if (end < 0) {
            end += this.tuple.length;
        }

        for (let n = start; n < end; ++n) {
            (this.tuple as Array<T>)[n] = value;
        }
        return this;
    }

    //    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
}

export type NumberTuplePrimitive<N extends number> = TuplePrimitive<number, N>;
