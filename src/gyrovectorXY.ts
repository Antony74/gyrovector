import { VectorLike, VectorLikeConstructor } from './vectorLike';
import { VectorXY } from './vectorXY';
import {
    createCurvature,
    Curvature,
} from './curvatureDependentTrigonometricFunctions';
import { VectorSpace } from './vectorSpace';

export class GyrovectorXY implements VectorLike<GyrovectorXY> {
    x;
    y;

    constructor(
        [x, y]: [number, number],
        public readonly curvature: Curvature,
    ) {
        this.x = x;
        this.y = y;
    }

    array(): Readonly<[number, number]> {
        return [this.x, this.y];
    }

    add(v: GyrovectorXY): GyrovectorXY {
        const _u = new VectorXY([this.x, this.y]);
        const _v = new VectorXY([v.x, v.y]);
        const lhs = _u.mult(
            1 - (2 * this.curvature.value * _u.dot(_v)) + _v.dot(_v),
        );
        const rhs = _v.mult(1 + (this.curvature.value * _u.dot(_u)));
        const top = lhs.add(rhs);

        const bottom =
            1 -
            (2 * this.curvature.value * _u.dot(_v)) +
            (this.curvature.value *
                this.curvature.value *
                _u.dot(_u) *
                _v.dot(_v));

        const result = top.mult(1 / bottom);
        return new GyrovectorXY([result.x, result.y], this.curvature);
    }

    sub(v: GyrovectorXY) {
        return this.add(new GyrovectorXY([-v.x, -v.y], this.curvature));
    }

    mult(c: number): GyrovectorXY {
        const u = new VectorXY([this.x, this.y]);
        if (c === 0 || (u.x === 0 && u.y === 0)) {
            return new GyrovectorXY([0, 0], this.curvature);
        }
        const magnitude = u.mag();
        const normalized = u.mult(1 / magnitude);
        const result = normalized.mult(
            this.curvature.tan(c * this.curvature.atan(magnitude)),
        );
        return new GyrovectorXY([result.x, result.y], this.curvature);
    }
    div(c: number): GyrovectorXY {
        return this.mult(1 / c);
    }

    rotate(radians: number): GyrovectorXY {
        const result = new VectorXY([this.x, this.y]).rotate(radians);
        return new GyrovectorXY([result.x, result.y], this.curvature);
    }

    dot(v: VectorXY): number {
        return (this.x * v.x) + (this.y * v.y);
    }

    magSq(): number {
        return this.dot(this);
    }

    mag(): number {
        return Math.sqrt(this.magSq());
    }
}

export const createGyrovectorXYSpace = (curvature: number) => {
    type Dimension = 2;
    type AdditionalConstructorParams = [Curvature];
    type Constructor = VectorLikeConstructor<
        Dimension,
        GyrovectorXY,
        AdditionalConstructorParams
    >;

    return new VectorSpace<
        Dimension,
        GyrovectorXY,
        Constructor,
        AdditionalConstructorParams
    >(GyrovectorXY, createCurvature(curvature));
};
