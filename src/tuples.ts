type _TupleOf<T, N extends number, R extends T[]> = R['length'] extends N
    ? R
    : _TupleOf<T, N, [T, ...R]>;

export type TuplePrimitive<T, N extends number> = _TupleOf<T, N, []>;

export type NumberTuplePrimitive<N extends number> = TuplePrimitive<number, N>;
