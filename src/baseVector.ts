import { NumberTuple } from './tuples';

export interface BaseVector<Dimension extends number, Vector> {
    array(): NumberTuple<Dimension>;
    add(v: Vector): Vector;
    sub(v: Vector): Vector;
    mult(c: number): Vector;
    div(c: number): Vector;
    rotate(radians: number): Vector;
}
