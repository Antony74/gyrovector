import { Curvature } from './curvatureDependentTrigonometricFunctions';
import { VectorLike } from './vectorLike';

export const mobiusAdd = <
    Dimension extends number,
    EuclideanVector extends VectorLike<Dimension, EuclideanVector>,
>(
    u: EuclideanVector,
    v: EuclideanVector,
    curvature: Curvature,
): EuclideanVector => {
    const lhs = u.mult(
        1 - (2 * curvature.value * u.dot(v)) - (curvature.value * v.dot(v)),
    );
    const rhs = v.mult(1 + (curvature.value * u.dot(u)));
    const top = lhs.add(rhs);

    const bottom =
        1 -
        (2 * curvature.value * u.dot(v)) +
        (curvature.value * curvature.value * u.dot(u) * v.dot(v));

    return top.mult(1 / bottom);
};

export const mobiusMult = <
    Dimension extends number,
    EuclideanVector extends VectorLike<Dimension, EuclideanVector>,
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
