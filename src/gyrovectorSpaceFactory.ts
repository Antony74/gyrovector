import { VectorSpaceXY } from './vectorXY';
import { GyrovectorXYSpace } from './gyrovectorXY';
import { VectorSpace } from './vector';
import { GyrovectorSpace } from './gyrovector';

/**
 * A factory class for creating instances of vector spaces and gyrovector spaces
 * based on dimension and curvature.
 */
export class GyrovectorSpaceFactory {
    /**
     * Creates a 2-dimensional Euclidean vector space.
     *
     * @param dimension - Must be 2
     * @param curvature - Must be 0
     * @returns An instance of VectorSpaceXY
     *
     * @example
     * ```ts
     * const space = GyrovectorSpaceFactory.create(2, 0);
     * ```
     */
    static create(dimension: 2, curvature: 0): VectorSpaceXY;

    /**
     * Creates a 2-dimensional gyrovector space.
     *
     * @param dimension - Must be 2
     * @param curvature - Curvature of space.  Negative for hyperbolic space, zero for Euclidean space,
     * positive for spherical space.
     * @returns An instance of GyrovectorXYSpace
     *
     * @example
     * ```ts
     * const space = GyrovectorSpaceFactory.create(2, 1.0);
     * ```
     */
    static create(dimension: 2, curvature: number): GyrovectorXYSpace;

    /**
     * Creates a Euclidean vector space in arbitrary dimension.
     *
     * @param dimension - The number of spatial dimensions
     * @param curvature - Must be 0
     * @returns A VectorSpace instance for the given dimension
     *
     * @example
     * ```ts
     * const space = GyrovectorSpaceFactory.create(3, 0);
     * ```
     */
    static create<Dimension extends number>(
        dimension: Dimension,
        curvature: 0,
    ): VectorSpace<Dimension>;

    /**
     * Creates a curved gyrovector space in arbitrary dimension.
     *
     * @param dimension - The number of spatial dimensions
     * @param curvature - Curvature of space.  Negative for hyperbolic space, zero for Euclidean space,
     * positive for spherical space.
     * @returns A specific instance of vector space or a gyrovector space
     *
     * @example
     * ```ts
     * const space = GyrovectorSpaceFactory.create(4, 0.5);
     * ```
     */
    static create<Dimension extends number>(
        dimension: Dimension,
        curvature: number,
    ): GyrovectorSpace<Dimension>;

    /**
     * Creates a gyrovector space
     *
     * @param dimension - The number of spatial dimensions
     * @param curvature - Curvature of space.  Negative for hyperbolic space, zero for Euclidean space,
     * positive for spherical space.
     * @returns A specific instance of vector space or a gyrovector space
     * 
     * @example
     * ```ts
     * const space = GyrovectorSpaceFactory.create(2, 0.5);
     * ```
     */
    static create(dimension: number, curvature: number) {
        if (dimension === 2) {
            if (curvature === 0) {
                return new VectorSpaceXY();
            } else {
                return new GyrovectorXYSpace(curvature);
            }
        } else {
            if (curvature === 0) {
                return new VectorSpace();
            } else {
                return new GyrovectorSpace(curvature);
            }
        }
    }
}
