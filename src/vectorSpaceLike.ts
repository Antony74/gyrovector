import { VectorLike } from './vectorLike';
import { NumberTuplePrimitive } from './tuples';

/**
 * A generic type representing vector space or gyrovector space.
 *
 * @template Dimension - The number of dimensions.
 * @template Vector - The concrete vector type that implements these operations.
 */
export type VectorSpaceLike<
    Dimension extends number,
    Vector extends VectorLike<Dimension, Vector>,
> = {
    /**
     * Adds two vectors.
     *
     * @param u - The first vector
     * @param v - The second vector
     * @returns A vector representing the sum of the addition. The order of the parameters matters
     * (except in Euclidean space) because gyrovector/mobius addition is not associative.
     *
     * @example
     * ```ts
     * const result = space.add(u, v);
     * ```
     */
    add: (u: Vector, v: Vector) => Vector;

    /**
     * Subtracts one vector from another.
     *
     * @param u - The vector to subtract from
     * @param v - The vector to subtract
     * @returns A vector representing the result of the subtraction.
     *
     * @example
     * ```ts
     * const result = space.sub(u, v);
     * ```
     */
    sub: (u: Vector, v: Vector) => Vector;

    /**
     * Multiplies a vector by a scalar.
     *
     * @param c - The scalar multiplier
     * @param u - The vector to scale
     * @returns A new scaled vector
     *
     * @example
     * ```ts
     * const result = space.mult(2, u);
     * ```
     */
    mult: (c: number, u: Vector) => Vector;

    /**
     * Divides a vector by a scalar.
     *
     * @param c - The scalar divisor
     * @param u - The vector to divide
     * @returns The resulting vector from u / c
     *
     * @example
     * ```ts
     * const result = space.div(2, u);
     * ```
     */
    div: (c: number, u: Vector) => Vector;

    /**
     * Rotates a vector in a specified plane by a given angle (in radians).
     *
     * @param u - The vector to rotate
     * @param radians - The angle of rotation in radians
     * @param firstAxis - The first axis in the plane of rotation (optional)
     * @param secondAxis - The second axis in the plane of rotation (optional)
     * @returns A new rotated vector
     *
     * @example
     * ```ts
     * const result = space.rotate(u, Math.PI / 2, 0, 1);
     * ```
     */
    rotate: (
        u: Vector,
        radians: number,
        firstAxis?: number,
        secondAxis?: number,
    ) => Vector;

    /**
     * Constructs a new vector.
     *
     * @param tuplePrimitive - An array of the correct length for the number of dimensions in this vector space
     * @returns A new vector instance
     *
     * @example
     * ```ts
     * const v = space.createVector(1, 2, 3);
     * ```
     */
    createVector: (
        ...tuplePrimitive: NumberTuplePrimitive<Dimension>
    ) => Vector;
};

export type VectorSpaceLikeWithoutCreate<
    Dimension extends number,
    Vector extends VectorLike<Dimension, Vector>,
> = Omit<VectorSpaceLike<Dimension, Vector>, 'createVector'>;
