import { GyrovectorXYSpace } from '../src/gyrovectorXY';
import { curvatureMinusOne } from './curvatureMinusOne';
import { curvatureZero } from './curvatureZero';

describe(`GyrovectorXY`, () => {
    describe(`curvature -1`, () => {
        const space = new GyrovectorXYSpace(-1);
        curvatureMinusOne(space);
    });

    describe(`curvature 0`, () => {
        const space = new GyrovectorXYSpace(0);
        curvatureZero(space);
    });
});
