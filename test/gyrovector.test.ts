import { GyrovectorSpace } from '../src';
import { curvatureMinusOne } from './curvatureMinusOne';
import { curvaturePlusHalf } from './curvaturePlusHalf';
import { curvatureZero } from './curvatureZero';
import { rotation } from './rotation';

describe(`Gyrovector`, () => {
    describe(`curvature -1`, () => {
        const space = new GyrovectorSpace<2>(-1);
        curvatureMinusOne(space);
        rotation(space);
    });

    describe(`curvature 0`, () => {
        const space = new GyrovectorSpace<2>(0);
        curvatureZero(space);
    });

    describe(`curvature +0.5`, () => {
        const space = new GyrovectorSpace<2>(0.5);
        curvaturePlusHalf(space);
    });
});
