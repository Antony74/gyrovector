import { GyrovectorXYSpace } from '../src/gyrovectorXY';
import { curvatureMinusOne } from './curvatureMinusOne';

describe(`GyrovectorXY`, () => {
    describe(`curvature -1`, () => {
        const space = new GyrovectorXYSpace(-1);
        curvatureMinusOne(space);
    });
});
