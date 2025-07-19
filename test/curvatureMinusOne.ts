import { VectorLike } from '../src/vectorLike';
import { VectorSpaceLike } from '../src/vectorSpaceLike';
import { dp5 } from './dp5';

// Answers supplied from https://github.com/joshgreaves/Gyrovectors

export const curvatureMinusOneAddition = <
    GyrovectorType extends VectorLike<2, GyrovectorType>,
>(
    space: VectorSpaceLike<2, GyrovectorType>,
) => {
    it(`adds`, () => {
        const u = space.createVector(0.2, 0.5);
        const v = space.createVector(-0.6, 0.1);

        const result = u.add(v).array();

        expect(dp5(result)).toEqual(['-0.58307', '0.44454']);
    });
};
