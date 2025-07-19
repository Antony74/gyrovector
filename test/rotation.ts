import { VectorLike } from '../src/vectorLike';
import { VectorSpaceLike } from '../src/vectorSpaceLike';
import { dp5 } from './dp5';

export const rotation = <
    GyrovectorType extends VectorLike<2, GyrovectorType>,
>(
    space: VectorSpaceLike<2, GyrovectorType>,
) => {
    it(`rotates`, () => {
        const u = space.createVector(0.2, 0.5);

        const result = u.rotate(Math.PI / 3).array();

        expect(dp5(result)).toEqual(['-0.33301', '0.42321']);
    });

    // it(`ignores rotations on invalid axes`, () => {
    //     const u = space.createVector(0.2, 0.5);

    //     const result = u.rotate(Math.PI / 3, 2, 3).array();

    //     expect(dp5(result)).toEqual(['0.20000', '0.50000']);
    // });
};
