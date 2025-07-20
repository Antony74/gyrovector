import { VectorLike } from './vectorLike';
import { VectorSpaceLikeWithoutCreate } from './vectorSpaceLike';
/**
 * Base class making it easy to define vector spaces which are mostly boilerplate
 */
export declare class VectorSpaceBase<Dimension extends number, Vector extends VectorLike<Dimension, Vector>> implements VectorSpaceLikeWithoutCreate<Dimension, Vector> {
    constructor();
    add(u: Vector, v: Vector): Vector;
    sub(u: Vector, v: Vector): Vector;
    mult(c: number, u: Vector): Vector;
    div(c: number, u: Vector): Vector;
    rotate(u: Vector, radians: number, firstAxis?: number, secondAxis?: number): Vector;
}
