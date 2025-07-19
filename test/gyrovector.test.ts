import { GyrovectorSpace } from '../src/gyrovector';
import { curvatureMinusOne } from './curvatureMinusOne';
import { curvatureZero } from './curvatureZero';

describe(`Gyrovector`, () => {
    describe(`curvature -1`, () => {
        const space = new GyrovectorSpace<2>(-1);
        curvatureMinusOne(space);
    });

    describe(`curvature 0`, () => {
        const space = new GyrovectorSpace<2>(0);
        curvatureZero(space);
    });
});
