import { VectorLike } from './vectorLike';
import { VectorXY } from './vectorXY';
import {
    createCurvature,
    Curvature,
} from './curvatureDependentTrigonometricFunctions';
import { VectorSpaceBase } from './vectorSpaceBase';
import { VectorSpaceLike } from './vectorSpaceLike';
import { mobiusAdd, mobiusMult } from './mobius';

/**
 * 2-dimensional gyrovector represented by the fields {x, y}
 */
export class GyrovectorXY implements VectorLike<2, GyrovectorXY> {
    readonly x: number;
    readonly y: number;

    constructor(
        public readonly curvature: Curvature,
        x: number,
        y: number,
    ) {
        this.x = x;
        this.y = y;
    }

    array(): Readonly<[number, number]> {
        return [this.x, this.y];
    }

    add(u: GyrovectorXY): GyrovectorXY {
        const _u = new VectorXY(u.x, u.y);
        const _v = new VectorXY(this.x, this.y);

        const result = mobiusAdd<2, VectorXY>(_u, _v, this.curvature);

        return new GyrovectorXY(this.curvature, result.x, result.y);
    }

    sub(v: GyrovectorXY) {
        return this.add(new GyrovectorXY(this.curvature, -v.x, -v.y));
    }

    mult(c: number): GyrovectorXY {
        const u = new VectorXY(this.x, this.y);
        const result = mobiusMult<2, VectorXY>(c, u, this.curvature);
        return new GyrovectorXY(this.curvature, result.x, result.y);
    }

    div(c: number): GyrovectorXY {
        return this.mult(1 / c);
    }

    rotate(
        radians: number,
        firstAxis: number = 0,
        secondAxis: number = 1,
    ): GyrovectorXY {
        const result = new VectorXY(this.x, this.y).rotate(
            radians,
            firstAxis,
            secondAxis,
        );
        return new GyrovectorXY(this.curvature, result.x, result.y);
    }
}

/**
 * 2-dimensional gyrovector space for gyrovectors represented by the fields {x, y}
 */
export class GyrovectorXYSpace
    extends VectorSpaceBase<2, GyrovectorXY>
    implements VectorSpaceLike<2, GyrovectorXY>
{
    curvature;

    constructor(curvature: number) {
        super();
        this.curvature = createCurvature(curvature);
    }

    createVector(x: number, y: number) {
        return new GyrovectorXY(this.curvature, x, y);
    }
}
