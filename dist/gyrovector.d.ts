import { VectorLike } from './vectorLike';
import { Curvature } from './curvatureDependentTrigonometricFunctions';
import { VectorSpaceBase } from './vectorSpaceBase';
import { VectorSpaceLike } from './vectorSpaceLike';
import { NumberTuplePrimitive } from './tuples';
/**
 * n-dimensional gyrovector represented by an array of the correct length
 */
export declare class Gyrovector<Dimension extends number> implements VectorLike<Dimension, Gyrovector<Dimension>> {
    readonly curvature: Curvature;
    private _tuple;
    constructor(curvature: Curvature, ...tuple: NumberTuplePrimitive<Dimension>);
    array(): Readonly<NumberTuplePrimitive<Dimension>>;
    add(u: Gyrovector<Dimension>): Gyrovector<Dimension>;
    sub(v: Gyrovector<Dimension>): Gyrovector<Dimension>;
    mult(c: number): Gyrovector<Dimension>;
    div(c: number): Gyrovector<Dimension>;
    rotate(radians: number): Gyrovector<Dimension>;
}
/**
 * n-dimensional gyrovector space for gyrovectors represented by an array of the correct length
 */
export declare class GyrovectorSpace<Dimension extends number> extends VectorSpaceBase<Dimension, Gyrovector<Dimension>> implements VectorSpaceLike<Dimension, Gyrovector<Dimension>> {
    curvature: Readonly<Curvature>;
    constructor(curvature: number);
    createVector(...tuple: NumberTuplePrimitive<Dimension>): Gyrovector<Dimension>;
}
