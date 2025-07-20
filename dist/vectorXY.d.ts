import { VectorLike } from './vectorLike';
import { VectorSpaceBase } from './vectorSpaceBase';
import { VectorSpaceLike } from './vectorSpaceLike';
/**
 * Two dimensional Euclidean vector represented by the fields {x, y}
 */
export declare class VectorXY implements VectorLike<2, VectorXY> {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
    add(v: VectorXY): VectorXY;
    sub(v: VectorXY): VectorXY;
    mult(c: number): VectorXY;
    div(c: number): VectorXY;
    rotate(radians: number, firstAxis?: number, secondAxis?: number): VectorXY;
    array(): Readonly<[number, number]>;
    dot(v: VectorXY): number;
    magSq(): number;
    mag(): number;
}
/**
 * Two dimensional Euclidean vector space where the vectors are represented by the fields {x, y}
 */
export declare class VectorSpaceXY extends VectorSpaceBase<2, VectorXY> implements VectorSpaceLike<2, VectorXY> {
    createVector(x: number, y: number): VectorXY;
}
