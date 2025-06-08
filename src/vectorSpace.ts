/* eslint-disable @typescript-eslint/no-explicit-any */
import { NumberTuplePrimitive } from './tuples';
import { VectorLike } from './vectorLike';
import { VectorSpaceLike } from './vectorSpaceLike';

export class VectorSpace<
    Dimension extends number,
    Vector extends VectorLike<Vector>,
> implements VectorSpaceLike<Dimension, Vector>
{
    constructorParams;

    constructor(
        private VectorConstructor: new (
            tuplePrimitive: NumberTuplePrimitive<Dimension>,
            ...constructorParams: any
        ) => Vector,
        ...constructorParams: any
    ) {
        this.constructorParams = constructorParams;
    }

    createVector(tuplePrimitive: NumberTuplePrimitive<Dimension>): Vector {
        return new this.VectorConstructor(
            tuplePrimitive,
            ...this.constructorParams,
        );
    }

    add(u: Vector, v: Vector): Vector {
        return u.add(v);
    }

    sub(u: Vector, v: Vector): Vector {
        return u.sub(v);
    }

    mult(c: number, u: Vector): Vector {
        return u.mult(c);
    }

    div(c: number, u: Vector): Vector {
        return u.div(c);
    }

    rotate(u: Vector, radians: number): Vector {
        return u.rotate(radians);
    }
}
