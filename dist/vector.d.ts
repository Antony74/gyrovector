import { NumberTuple, NumberTuplePrimitive } from './tuples';
import { VectorLike } from './vectorLike';
import { VectorSpaceBase } from './vectorSpaceBase';
import { VectorSpaceLike } from './vectorSpaceLike';
/**
 * n-dimensional Euclidean vector represented by an array of the correct length
 */
export declare class Vector<Dimension extends number> implements VectorLike<Dimension, Vector<Dimension>> {
    private _tuple;
    constructor(...tuple: NumberTuplePrimitive<Dimension>);
    get tuple(): Readonly<NumberTuple<Dimension>>;
    array(): Readonly<NumberTuplePrimitive<Dimension>>;
    add(v: Vector<Dimension>): Vector<Dimension>;
    sub(v: Vector<Dimension>): Vector<Dimension>;
    mult(c: number): Vector<Dimension>;
    div(c: number): Vector<Dimension>;
    rotate(radians: number, firstAxis?: number, secondAxis?: number): Vector<Dimension>;
    dot(v: Vector<Dimension>): number;
    magSq(): number;
    mag(): number;
}
/**
 * n-dimensional Euclidean vector space for vectors represented by an array of the correct length
 */
export declare class VectorSpace<Dimension extends number> extends VectorSpaceBase<Dimension, Vector<Dimension>> implements VectorSpaceLike<Dimension, Vector<Dimension>> {
    constructor();
    createVector(...tuple: NumberTuplePrimitive<Dimension>): Vector<Dimension>;
}
