import { NumberTuplePrimitive } from './tuples';
import { Vector } from './vector';
import { VectorSpaceLike } from './vectorSpaceLike';

export class VectorSpace<Dimension extends number>
    implements VectorSpaceLike<Dimension, Vector<Dimension>>
{
    createVector(
        tuplePrimitive: NumberTuplePrimitive<Dimension>,
    ): Vector<Dimension> {
        return new Vector(tuplePrimitive);
    }

    add(u: Vector<Dimension>, v: Vector<Dimension>): Vector<Dimension> {
        return u.add(v);
    }

    sub(u: Vector<Dimension>, v: Vector<Dimension>): Vector<Dimension> {
        return u.sub(v);
    }

    mult(c: number, u: Vector<Dimension>): Vector<Dimension> {
        return u.mult(c);
    }

    div(c: number, u: Vector<Dimension>): Vector<Dimension> {
        return u.div(c);
    }

    rotate(u: Vector<Dimension>, radians: number): Vector<Dimension> {
        return u.rotate(radians);
    }
}
