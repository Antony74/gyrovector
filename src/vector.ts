import { NumberTuple, NumberTuplePrimitive } from './tuples';
import { VectorLike } from './vectorLike';

export class Vector<Dimension extends number>
    extends NumberTuple<Dimension>
    implements VectorLike<Vector<Dimension>>
{
    constructor(...tuple: NumberTuplePrimitive<Dimension>) {
        super(tuple);
    }

    array(): ReadonlyArray<number> {
        return this.tuple;
    }

    add(v: Vector<Dimension>): Vector<Dimension> {
        return new Vector<Dimension>(
            ...this.map((value, index) => {
                return value + v.at(index);
            }).tuple,
        );
    }

    sub(v: Vector<Dimension>): Vector<Dimension> {
        return new Vector<Dimension>(
            ...this.map((value, index) => {
                return value - v.at(index);
            }).tuple,
        );
    }

    mult(c: number): Vector<Dimension> {
        return new Vector<Dimension>(
            ...this.map((value) => {
                return c * value;
            }).tuple,
        );
    }

    div(c: number): Vector<Dimension> {
        const reciprocal = 1 / c;
        return new Vector<Dimension>(
            ...this.map((value) => {
                return reciprocal * value;
            }).tuple,
        );
    }

    rotate(
        radians: number,
        firstAxis: number = 0,
        secondAxis: number = 1,
    ): Vector<Dimension> {
        const x = this.at(firstAxis);
        const y = this.at(secondAxis);

        return new Vector<Dimension>(
            ...this.map((value, index) => {
                if (index === firstAxis) {
                    return (x * Math.cos(radians)) - (y * Math.sin(radians));
                } else if (index === secondAxis) {
                    return (x * Math.sin(radians)) + (y * Math.cos(radians));
                } else {
                    return value;
                }
            }).tuple,
        );
    }

    dot(v: Vector<Dimension>): number {
        return this.reduce((acc, value, index) => {
            return acc + (value * v.at(index));
        }, 0);
    }

    magSq(): number {
        return this.dot(this);
    }

    mag(): number {
        return Math.sqrt(this.magSq());
    }
}
