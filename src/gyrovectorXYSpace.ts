import { BaseVectorSpace } from './baseVectorSpace';
import { GyrovectorXY } from './gyrovectorXY';

import {
    Curvature,
    createCurvature,
} from './curvatureDependentTrigonometricFunctions';

export class GyrovectorXYSpace implements BaseVectorSpace<2, GyrovectorXY> {
    curvature: Curvature;

    constructor(curvature: number) {
        this.curvature = createCurvature(curvature);
    }

    createVector(x: number, y: number): GyrovectorXY {
        return new GyrovectorXY(x, y, this.curvature);
    }

    add(u: GyrovectorXY, v: GyrovectorXY): GyrovectorXY {
        return u.add(v);
    }

    sub(u: GyrovectorXY, v: GyrovectorXY): GyrovectorXY {
        return u.sub(v);
    }

    mult(c: number, u: GyrovectorXY): GyrovectorXY {
        return u.mult(c);
    }

    div(c: number, u: GyrovectorXY): GyrovectorXY {
        return u.mult(1 / c);
    }

    rotate(u: GyrovectorXY, radians: number): GyrovectorXY {
        return u.rotate(radians);
    }
}
