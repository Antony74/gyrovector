import { NumberTuple, Tuple } from '../src/tuples';

describe(`Tuple`, () => {
    it(`has a length`, () => {
        const tuple = new NumberTuple<3>([1, 2, 3]);
        expect(tuple.length).toEqual(3);
    });

    it(`can be created from an array`, () => {
        const result = Tuple.from<number, 3>(3, [1, 2, 3]);
        expect(result.tuple).toEqual([1, 2, 3]);
    });

    it(`can't be created from an array of the incorrect length`, () => {
        let msg;

        try {
            Tuple.from<number, 4>(4, [1, 2, 3]);
        } catch (e) {
            if (e instanceof Error) {
                msg = e.message;
            }
        }

        expect(msg).toEqual(
            'Tuple.from: Array of length 4 required to create a 4-tuple',
        );
    });

    it(`can filter`, () => {
        const tuple = new NumberTuple<3>([1, 2, 3]);
        expect(tuple.filter((value) => value !== 2)).toEqual([1, 3]);
    });
});
