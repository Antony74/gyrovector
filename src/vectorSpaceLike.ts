import { VectorLike } from './vectorLike';
import { NumberTuple } from './tuples';

export interface VectorSpaceLike<
    Dimension extends number,
    Vector extends VectorLike<Dimension, Vector>,
> {
    createVector: (...vec: NumberTuple<Dimension>) => Vector;
    add: (u: Vector, v: Vector) => Vector;
    sub: (u: Vector, v: Vector) => Vector;
    mult: (c: number, u: Vector) => Vector;
    div: (c: number, u: Vector) => Vector;
    rotate: (u: Vector, radians: number) => Vector;
}
