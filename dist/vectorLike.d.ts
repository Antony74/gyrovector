import { NumberTuplePrimitive } from './tuples';
/**
 * A generic type representing vector or gyrovector.
 *
 * @template Dimension - The number of dimensions.
 * @template Vector - The concrete vector type that implements these operations.
 */
export type VectorLike<Dimension extends number, Vector> = {
    /**
     * Returns the vector as an array.
     *
     * @example
     * ```ts
     * const coords = v.array(); // e.g., [1, 2, 3]
     * ```
     */
    array(): Readonly<NumberTuplePrimitive<Dimension>>;
    /**
     * Adds another vector to this vector.
     *
     * @param v - The vector to add
     * @returns A new vector representing the sum
     *
     * @example
     * ```ts
     * const result = u.add(v);
     * ```
     */
    add(v: Vector): Vector;
    /**
     * Subtracts another vector from this vector.
     *
     * @param v - The vector to subtract
     * @returns A new vector representing the result of the substraction
     *
     * @example
     * ```ts
     * const result = u.sub(v);
     * ```
     */
    sub(v: Vector): Vector;
    /**
     * Multiplies the vector by a scalar value.
     *
     * @param c - The scalar multiplier
     * @returns A new vector representing the result of the multiplication
     *
     * @example
     * ```ts
     * const result = u.mult(2);
     * ```
     */
    mult(c: number): Vector;
    /**
     * Divides the vector by a scalar value.
     *
     * @param c - The scalar divisor
     * @returns A new vector representing the result of the division
     *
     * @example
     * ```ts
     * const result = u.div(2);
     * ```
     */
    div(c: number): Vector;
    /**
     * Rotates the vector within a specified plane by a given angle (in radians).
     *
     * @param radians - The rotation angle in radians
     * @param firstAxis - The first axis in the plane of rotation (optional)
     * @param secondAxis - The second axis in the plane of rotation (optional)
     * @returns The rotated vector
     *
     * @example
     * ```ts
     * const rotated = v.rotate(Math.PI / 2, 0, 1);
     * ```
     */
    rotate(radians: number, firstAxis?: number, secondAxis?: number): Vector;
};
export type VectorLikeWithMeasure<Dimension extends number, Vector> = VectorLike<Dimension, Vector> & {
    dot(v: Vector): number;
    magSq(): number;
    mag(): number;
};
