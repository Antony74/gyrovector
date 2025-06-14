import { NumberTuplePrimitive } from './tuples';

export interface VectorLike<Dimension extends number, Vector> {
    array(): Readonly<NumberTuplePrimitive<Dimension>>;
    add(v: Vector): Vector;
    sub(v: Vector): Vector;
    mult(c: number): Vector;
    div(c: number): Vector;
    rotate(radians: number, firstAxis?: number, secondAxis?: number): Vector;
    dot(v: Vector): number;
    magSq(): number;
    mag(): number;
}
