import { GyrovectorXYSpace } from '../src/gyrovectorXY';
import { curvatureMinusOneAddition } from './curvatureMinusOne';

describe(`GyrovectorXY`, () => {
    describe(`curvature -1`, () => {
        const space = new GyrovectorXYSpace(-1);
        curvatureMinusOneAddition(space);
    });
});
