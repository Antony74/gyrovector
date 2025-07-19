import { VectorLike } from '../src/vectorLike';
import { VectorSpaceLike } from '../src/vectorSpaceLike';
import { dp5 } from './dp5';

export const curvaturePlusHalf = <
    GyrovectorType extends VectorLike<2, GyrovectorType>,
>(
    space: VectorSpaceLike<2, GyrovectorType>,
) => {
    it(`adds`, () => {
        const u = space.createVector(0.2, 0.5);
        const v = space.createVector(-0.6, 0.1);

        const result = u.add(v).array();

        expect(dp5(result)).toEqual(['-0.28993', '0.62453']);
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

        expect(dp5(result)).toEqual(['-0.67506', '1.68766']);
    });
};
