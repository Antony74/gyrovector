import { GyrovectorSpace } from '../src/gyrovector';
import { curvatureMinusOne } from './curvatureMinusOne';

describe(`Gyrovector`, () => {
    describe(`curvature -1`, () => {
        const space = new GyrovectorSpace<2>(-1);
        curvatureMinusOne(space);
    });
});
