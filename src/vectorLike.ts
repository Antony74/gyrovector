import { NumberTuplePrimitive } from './tuples';

export interface VectorLike<Vector> {
    array(): ReadonlyArray<number>;
    add(v: Vector): Vector;
    sub(v: Vector): Vector;
    mult(c: number): Vector;
    div(c: number): Vector;
    rotate(radians: number, firstAxis?: number, secondAxis?: number): Vector;
    dot(v: Vector): number;
    magSq(): number;
    mag(): number;
}

export type VectorLikeConstructor<
    Dimension extends number,
    Vector extends VectorLike<Vector>,
    AdditionalVectorConstructorParams extends Array<unknown> = [],
> = new (
    tuplePrimitive: NumberTuplePrimitive<Dimension>,
    ...additionalVectorConstructorParams: AdditionalVectorConstructorParams
) => Vector;
