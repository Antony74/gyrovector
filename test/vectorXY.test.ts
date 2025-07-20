import { VectorSpaceXY } from '../src/vectorXY';
import { curvatureZero } from './curvatureZero';
import { rotation } from './rotation';

describe(`VectorXY`, () => {
    describe(`curvature 0`, () => {
        const space = new VectorSpaceXY();
        curvatureZero(space);
        rotation(space);
    });
});
