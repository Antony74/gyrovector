import { VectorSpace } from '../src/vector';
import { curvatureZero } from './curvatureZero';

describe(`Vector`, () => {
    describe(`curvature 0`, () => {
        const space = new VectorSpace<2>();
        curvatureZero(space);
    });
});
