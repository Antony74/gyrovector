import { VectorLike } from './vectorLike';
import { NumberTuplePrimitive } from './tuples';

export type VectorSpaceLike<
    Dimension extends number,
    Vector extends VectorLike<Dimension, Vector>,
> = {
    add: (u: Vector, v: Vector) => Vector;
    sub: (u: Vector, v: Vector) => Vector;
    mult: (c: number, u: Vector) => Vector;
    div: (c: number, u: Vector) => Vector;

    rotate: (
        u: Vector,
        radians: number,
        firstAxis?: number,
        secondAxis?: number,
    ) => Vector;

    createVector: (
        ...tuplePrimitive: NumberTuplePrimitive<Dimension>
    ) => Vector;
};

export type VectorSpaceLikeWithoutCreate<
    Dimension extends number,
    Vector extends VectorLike<Dimension, Vector>,
> = Omit<VectorSpaceLike<Dimension, Vector>, 'createVector'>;
