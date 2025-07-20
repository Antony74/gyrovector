import { VectorLike } from '../src/vectorLike';
import { VectorSpaceLike } from '../src/vectorSpaceLike';
import { dp5 } from './dp5';

export const rotation = <GyrovectorType extends VectorLike<2, GyrovectorType>>(
    space: VectorSpaceLike<2, GyrovectorType>,
) => {
    it(`rotates`, () => {
        const u = space.createVector(0.2, 0.5);

        const result = u.rotate(Math.PI / 3).array();

        expect(dp5(result)).toEqual(['-0.33301', '0.42321']);
    });

    it(`throw on rotations with invalid axes`, () => {
        const u = space.createVector(0.2, 0.5);

        let msg;

        try {
            u.rotate(Math.PI / 3, 0, 3);
        } catch (e) {
            if (e instanceof Error) {
                msg = e.message;
            }
        }

        expect(msg).toContain('rotate');
        expect(msg).toContain('called with invalid axes');
    });

    it(`throw on rotations with the same axis specified twice`, () => {
        const u = space.createVector(0.2, 0.5);

        let msg;

        try {
            u.rotate(Math.PI / 3, 0, 0);
        } catch (e) {
            if (e instanceof Error) {
                msg = e.message;
            }
        }

        expect(msg).toContain('rotate');
        expect(msg).toContain('called with invalid axes');
    });
};
