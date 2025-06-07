import { NumberTuple, NumberTuplePrimitive } from './tuples';
import { VectorLike } from './vectorLike';

export class Vector<Dimension extends number>
    implements VectorLike<Dimension, Vector<Dimension>>
{
    public tuple: NumberTuple<Dimension>;

    constructor(tuple: NumberTuplePrimitive<Dimension>) {
        this.tuple = new NumberTuple<Dimension>(tuple);
    }

    array() {
        return this.tuple.tuple;
    }

    add(v: Vector<Dimension>): Vector<Dimension> {
        return new Vector<Dimension>(
            this.tuple.map<number>((value, index) => {
                return value + v.tuple.tuple[index];
            }).tuple,
        );
    }

    sub(v: Vector<Dimension>): Vector<Dimension> {
        return new Vector<Dimension>(
            this.tuple.map<number>((value, index) => {
                return value - v.tuple.tuple[index];
            }).tuple,
        );
    }

    mult(c: number): Vector<Dimension> {
        return new Vector<Dimension>(
            this.tuple.map((value) => {
                return c * value;
            }).tuple,
        );
    }

    div(c: number): Vector<Dimension> {
        const reciprocal = 1 / c;
        return new Vector<Dimension>(
            this.tuple.map((value) => {
                return reciprocal * value;
            }).tuple,
        );
    }

    rotate(
        radians: number,
        firstAxis: number = 0,
        secondAxis: number = 1,
    ): Vector<Dimension> {
        const x = this.tuple.tuple[firstAxis];
        const y = this.tuple.tuple[secondAxis];

        return new Vector<Dimension>(
            this.tuple.map((value, index) => {
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
}
