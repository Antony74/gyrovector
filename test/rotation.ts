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

    it(`rotates with axes switched`, () => {
        const u = space.createVector(0.2, 0.5);

        const result = u.rotate(-Math.PI / 3, 1, 0).array();

        expect(dp5(result)).toEqual(['-0.33301', '0.42321']);
    });

    it(`throw on rotations with invalid axes`, () => {
        const u = space.createVector(0.2, 0.5);

        const fn = () => u.rotate(Math.PI / 3, 0, 3);

        expect(fn).toThrow(/rotate[\s\S]*called with invalid axes/);
    });

    it(`throw on rotations with the same axis specified twice`, () => {
        const u = space.createVector(0.2, 0.5);

        const fn = () => u.rotate(Math.PI / 3, 0, 0);

        expect(fn).toThrow(/rotate[\s\S]*called with invalid axes/);
    });
};
