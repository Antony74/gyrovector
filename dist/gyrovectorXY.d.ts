import { VectorLike } from './vectorLike';
import { Curvature } from './curvatureDependentTrigonometricFunctions';
import { VectorSpaceBase } from './vectorSpaceBase';
import { VectorSpaceLike } from './vectorSpaceLike';
/**
 * 2-dimensional gyrovector represented by the fields {x, y}
 */
export declare class GyrovectorXY implements VectorLike<2, GyrovectorXY> {
    readonly curvature: Curvature;
    readonly x: number;
    readonly y: number;
    constructor(curvature: Curvature, x: number, y: number);
    array(): Readonly<[number, number]>;
    add(u: GyrovectorXY): GyrovectorXY;
    sub(v: GyrovectorXY): GyrovectorXY;
    mult(c: number): GyrovectorXY;
    div(c: number): GyrovectorXY;
    rotate(radians: number): GyrovectorXY;
}
/**
 * 2-dimensional gyrovector space for gyrovectors represented by the fields {x, y}
 */
export declare class GyrovectorXYSpace extends VectorSpaceBase<2, GyrovectorXY> implements VectorSpaceLike<2, GyrovectorXY> {
    curvature: Readonly<Curvature>;
    constructor(curvature: number);
    createVector(x: number, y: number): GyrovectorXY;
}
