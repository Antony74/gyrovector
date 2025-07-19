import { GyrovectorSpace } from '../src/gyrovector';
import { curvatureMinusOneAddition } from './curvatureMinusOne';

describe(`Gyrovector`, () => {
    describe(`curvature -1`, () => {
        const space = new GyrovectorSpace<2>(-1);
        curvatureMinusOneAddition(space);
    });
});
