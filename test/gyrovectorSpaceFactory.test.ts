import {
    GyrovectorSpace,
    GyrovectorSpaceFactory,
    GyrovectorXYSpace,
    VectorSpace,
    VectorSpaceXY,
} from '../src';

describe(`GyrovectorSpaceFactory.create()`, () => {
    it(`returns a VectorSpaceXY, when asked for 2d, 0 curvature`, () => {
        const result = GyrovectorSpaceFactory.create(2, 0);
        expect(result).toBeInstanceOf(VectorSpaceXY);
    });

    it(`returns a GyrovectorXYSpace, when asked for 2d, with curvature`, () => {
        const result = GyrovectorSpaceFactory.create(2, -1);
        expect(result).toBeInstanceOf(GyrovectorXYSpace);
    });

    it(`returns a VectorSpace, when asked for non-2d, 0 curvature`, () => {
        const result = GyrovectorSpaceFactory.create(4, 0);
        expect(result).toBeInstanceOf(VectorSpace);
    });

    it(`returns a GyrovectorSpace, when asked for non-2d, with curvature`, () => {
        const result = GyrovectorSpaceFactory.create(4, -1);
        expect(result).toBeInstanceOf(GyrovectorSpace);
    });
});
