import { VectorLike } from './vectorLike';
import { VectorSpaceLike } from './vectorSpaceLike';

export class VectorSpaceBase<Vector extends VectorLike<Vector>>
    implements VectorSpaceLike<Vector>
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
