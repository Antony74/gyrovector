import { Curvature } from './curvatureDependentTrigonometricFunctions';
import { VectorLikeWithMeasure } from './vectorLike';

export const mobiusAdd = <
    Dimension extends number,
    EuclideanVector extends VectorLikeWithMeasure<Dimension, EuclideanVector>,
>(
    u: EuclideanVector,
    v: EuclideanVector,
    curvature: Curvature,
): EuclideanVector => {
    const u2kDotV = 2 * curvature.value * u.dot(v);
    const uMagSq = u.dot(u);
    const vMagSq = v.dot(v);

    const lhs = u.mult(1 - u2kDotV - (curvature.value * vMagSq));
    const rhs = v.mult(1 + (curvature.value * uMagSq));
    const top = lhs.add(rhs);

    const bottom =
        1 - u2kDotV + (curvature.value * curvature.value * uMagSq * vMagSq);

    const result = top.mult(1 / bottom);

    // console.log({ u, v, lhs, rhs, bottom, result });

    return result;
};

export const mobiusMult = <
    Dimension extends number,
    EuclideanVector extends VectorLikeWithMeasure<Dimension, EuclideanVector>,
>(
    c: number,
    u: EuclideanVector,
    curvature: Curvature,
): EuclideanVector => {
    if (c === 0 || u.magSq() === 0) {
        return u.mult(0);
    }
    const magnitude = u.mag();
    const normalized = u.mult(1 / magnitude);
    const result = normalized.mult(
        curvature.tan(c * curvature.atan(magnitude)),
    );
    return result;
};
