import { GyrovectorXYSpace } from '../src/gyrovectorXY';
import { curvatureMinusOne } from './curvatureMinusOne';
import { curvaturePlusHalf } from './curvaturePlusHalf';
import { curvatureZero } from './curvatureZero';
import { rotation } from './rotation';

describe(`GyrovectorXY`, () => {
    describe(`curvature -1`, () => {
        const space = new GyrovectorXYSpace(-1);
        curvatureMinusOne(space);
        rotation(space);
    });

    describe(`curvature 0`, () => {
        const space = new GyrovectorXYSpace(0);
        curvatureZero(space);
    });

    describe(`curvature +0.5`, () => {
        const space = new GyrovectorXYSpace(0.5);
        curvaturePlusHalf(space);
    });
});
