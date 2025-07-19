import { VectorSpaceXY } from '../src/vectorXY';
import { curvatureZero } from './curvatureZero';

describe(`VectorXY`, () => {
    describe(`curvature 0`, () => {
        const space = new VectorSpaceXY();
        curvatureZero(space);
    });
});
