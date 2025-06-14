type _TupleOf<
    T,
    Dimension extends number,
    R extends T[],
> = R['length'] extends Dimension ? R : _TupleOf<T, Dimension, [T, ...R]>;

export type TuplePrimitive<T, Dimension extends number> = _TupleOf<
    T,
    Dimension,
    []
>;

export class Tuple<T, Dimension extends number> {
    constructor(public tuple: TuplePrimitive<T, Dimension>) {}

    get length(): Dimension {
        return (this.tuple as Array<T>).length as Dimension;
    }

    at(index: number): T {
        return (this.tuple as Array<T>)[index];
    }

    static isTuplePrimitive<T, Dimension extends number>(
        n: number,
        maybeTuple: { length: number },
    ): maybeTuple is TuplePrimitive<T, Dimension> {
        return Array.isArray(maybeTuple) && maybeTuple.length === n;
    }

    static from<T, Dimension extends number>(
        n: number,
        maybeTuple: { length: number },
    ): Tuple<T, Dimension> {
        const arr = Array.from<T>(maybeTuple);
        if (Tuple.isTuplePrimitive<T, Dimension>(n, arr)) {
            return new Tuple<T, Dimension>(arr);
        } else {
            throw new Error(
                `Tuple.from: Array of length ${n} required to create a ${n}-tuple`,
            );
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

    map<U>(
        callbackfn: (value: T, index: number, array: T[]) => U,
        thisArg?: Readonly<ArrayLike<T>>,
    ): Tuple<U, Dimension> {
        const result = (this.tuple as Array<T>).map(callbackfn, thisArg);
        return new Tuple<U, Dimension>(result as TuplePrimitive<U, Dimension>);
    }

    filter(
        predicate: (value: T, index: number, array: T[]) => unknown,
        thisArg?: Readonly<ArrayLike<T>>,
    ): T[] {
        return (this.tuple as Array<T>).filter(predicate, thisArg);
    }

    reduce<U>(
        callbackfn: (
            previousValue: U,
            currentValue: T,
            currentIndex: number,
            array: T[],
        ) => U,
        initialValue: U,
    ): U {
        return (this.tuple as Array<T>).reduce(callbackfn, initialValue);
    }
}

export type NumberTuplePrimitive<Dimension extends number> = TuplePrimitive<
    number,
    Dimension
>;

export class NumberTuple<Dimension extends number> extends Tuple<
    number,
    Dimension
> {}
