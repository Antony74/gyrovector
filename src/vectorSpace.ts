import { NumberTuplePrimitive } from './tuples';
import { VectorLike } from './vectorLike';
import { VectorSpaceLike } from './vectorSpaceLike';

export class VectorSpace<
    Dimension extends number,
    Vector extends VectorLike<Vector>,
    AdditionalVectorConstructorParams extends Array<unknown> = [],
> implements VectorSpaceLike<Dimension, Vector>
{
    additionalVectorConstructorParams;

    constructor(
        private VectorConstructor: new (
            tuplePrimitive: NumberTuplePrimitive<Dimension>,
            ...additionalVectorConstructorParams: AdditionalVectorConstructorParams
        ) => Vector,
        ...additionalVectorConstructorParams: AdditionalVectorConstructorParams
    ) {
        this.additionalVectorConstructorParams =
            additionalVectorConstructorParams;
    }

    createVector(tuplePrimitive: NumberTuplePrimitive<Dimension>): Vector {
        return new this.VectorConstructor(
            tuplePrimitive,
            ...this.additionalVectorConstructorParams,
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
