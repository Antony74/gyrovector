import { BaseVector } from './baseVector';
import { NumberTuple } from './tuples';

export interface BaseVectorSpace<
    Dimension extends number,
    Vector extends BaseVector<Dimension, Vector>,
> {
    createVector: (...vec: NumberTuple<Dimension>) => Vector;
    add: (u: Vector, v: Vector) => Vector;
    sub: (u: Vector, v: Vector) => Vector;
    mult: (c: number, u: Vector) => Vector;
    div: (c: number, u: Vector) => Vector;
    rotate: (u: Vector, radians: number) => Vector;
}
