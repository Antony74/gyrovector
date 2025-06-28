import { NumberTuplePrimitive } from './tuples';

export type VectorLike<Dimension extends number, Vector> = {
    array(): Readonly<NumberTuplePrimitive<Dimension>>;
    add(v: Vector): Vector;
    sub(v: Vector): Vector;
    mult(c: number): Vector;
    div(c: number): Vector;
    rotate(radians: number, firstAxis?: number, secondAxis?: number): Vector;
};

export type VectorLikeWithMeasure<
    Dimension extends number,
    Vector,
> = VectorLike<Dimension, Vector> & {
    dot(v: Vector): number;
    magSq(): number;
    mag(): number;
};
