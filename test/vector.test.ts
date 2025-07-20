import { VectorSpace } from '../src/vector';
import { curvatureZero } from './curvatureZero';
import { dp5 } from './dp5';
import { rotation } from './rotation';

describe(`Vector`, () => {
    describe(`curvature 0`, () => {
        const space2 = new VectorSpace<2>();
        curvatureZero(space2);
        rotation(space2);

        it(`rotates in three dimensions`, () => {
            const space3 = new VectorSpace<3>();

            const u = space3.createVector(0.2, -0.1, 0.5);

            const result = space3.rotate(u, Math.PI / 3, 0, 2).array();

            expect(dp5(result)).toEqual(['-0.33301', '-0.10000', '0.42321']);
        });
    });
});
