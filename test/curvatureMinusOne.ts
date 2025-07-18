import { VectorLike } from '../src/vectorLike';
import { VectorSpaceLike } from '../src/vectorSpaceLike';
import { dp5 } from './dp5';

export const curvatureMinusOne = <
    GyrovectorType extends VectorLike<2, GyrovectorType>,
>(
    space: VectorSpaceLike<2, GyrovectorType>,
) => {
    it(`adds`, () => {
        const u = space.createVector(0.2, 0.5);
        const v = space.createVector(-0.6, 0.1);

        const result = u.add(v).array();

        // Answer supplied from https://github.com/joshgreaves/Gyrovectors
        expect(dp5(result)).toEqual(['-0.58307', '0.44454']);
    });

    it(`substracts`, () => {
        const u = space.createVector(0.2, 0.5);
        const v = space.createVector(-0.6, 0.1);

        const result = u.add(v).sub(v).array();

        expect(dp5(result)).toEqual(['0.20000', '0.50000']);
    });

    it(`multiplies`, () => {
        const u = space.createVector(-0.2, 0.5);

        const result = u.mult(2.5).array();

        // Answer supplied from https://github.com/joshgreaves/Gyrovectors
        expect(dp5(result)).toEqual(['-0.33651', '0.84127']);
    });
};
