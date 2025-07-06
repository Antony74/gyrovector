import { VectorLike } from './vectorLike';
import { VectorSpaceLikeWithoutCreate } from './vectorSpaceLike';

/**
 * Base class making it easy to define vector spaces which are mostly boilerplate
 */
export class VectorSpaceBase<
    Dimension extends number,
    Vector extends VectorLike<Dimension, Vector>,
> implements VectorSpaceLikeWithoutCreate<Dimension, Vector>
{
    constructor() {}

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
