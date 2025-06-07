import { VectorSpaceLike } from './vectorSpaceLike';
import { VectorXY } from './vectorXY';

export class VectorXYSpace implements VectorSpaceLike<2, VectorXY> {
    createVector([x, y]: [number, number]): VectorXY {
        return new VectorXY(x, y);
    }

    add(u: VectorXY, v: VectorXY): VectorXY {
        return u.add(v);
    }

    sub(u: VectorXY, v: VectorXY): VectorXY {
        return u.sub(v);
    }

    mult(c: number, u: VectorXY): VectorXY {
        return u.mult(c);
    }

    div(c: number, u: VectorXY): VectorXY {
        return u.div(c);
    }

    rotate(u: VectorXY, radians: number): VectorXY {
        return u.rotate(radians);
    }
}
