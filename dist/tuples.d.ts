type _TupleOf<T, Dimension extends number, R extends T[]> = R['length'] extends Dimension ? R : _TupleOf<T, Dimension, [T, ...R]>;
export type TuplePrimitive<T, Dimension extends number> = _TupleOf<T, Dimension, [
]>;
export declare class Tuple<T, Dimension extends number> {
    tuple: TuplePrimitive<T, Dimension>;
    constructor(tuple: TuplePrimitive<T, Dimension>);
    get length(): Dimension;
    at(index: number): T | undefined;
    static isTuplePrimitive<T, Dimension extends number>(n: number, maybeTuple: {
        length: number;
    }): maybeTuple is TuplePrimitive<T, Dimension>;
    static from<T, Dimension extends number>(n: Dimension, maybeTuple: {
        length: number;
    }): Tuple<T, Dimension>;
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: Readonly<ArrayLike<T>>): Tuple<U, Dimension>;
    filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: Readonly<ArrayLike<T>>): T[];
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
}
export type NumberTuplePrimitive<Dimension extends number> = TuplePrimitive<number, Dimension>;
export declare class NumberTuple<Dimension extends number> extends Tuple<number, Dimension> {
}
export {};
