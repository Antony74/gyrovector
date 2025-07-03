import { NumberTuple, NumberTuplePrimitive } from './tuples';
import { VectorLike } from './vectorLike';
import { VectorSpaceBase } from './vectorSpaceBase';
import { VectorSpaceLike } from './vectorSpaceLike';

export class Vector<Dimension extends number>
    implements VectorLike<Dimension, Vector<Dimension>>
{
    private _tuple: NumberTuple<Dimension>;

    constructor(...tuple: NumberTuplePrimitive<Dimension>) {
        this._tuple = new NumberTuple(tuple);
    }

    get tuple(): Readonly<NumberTuple<Dimension>> {
        return this._tuple;
    }

    array(): Readonly<NumberTuplePrimitive<Dimension>> {
        return this._tuple.tuple;
    }

    add(v: Vector<Dimension>): Vector<Dimension> {
        return new Vector<Dimension>(
            ...this._tuple.map((value, index) => {
                return value + v.tuple.at(index);
            }).tuple,
        );
    }

    sub(v: Vector<Dimension>): Vector<Dimension> {
        return new Vector<Dimension>(
            ...this._tuple.map((value, index) => {
                return value - v._tuple.at(index);
            }).tuple,
        );
    }

    mult(c: number): Vector<Dimension> {
        return new Vector<Dimension>(
            ...this._tuple.map((value) => {
                return c * value;
            }).tuple,
        );
    }

    div(c: number): Vector<Dimension> {
        const reciprocal = 1 / c;
        return new Vector<Dimension>(
            ...this._tuple.map((value) => {
                return reciprocal * value;
            }).tuple,
        );
    }

    rotate(
        radians: number,
        firstAxis: number = 0,
        secondAxis: number = 1,
    ): Vector<Dimension> {
        const x = this._tuple.at(firstAxis);
        const y = this._tuple.at(secondAxis);

        return new Vector<Dimension>(
            ...this._tuple.map((value, index) => {
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
        return this._tuple.reduce((acc, value, index) => {
            return acc + (value * v._tuple.at(index));
        }, 0);
    }

    magSq(): number {
        return this.dot(this);
    }

    mag(): number {
        return Math.sqrt(this.magSq());
    }
}

export class VectorSpace<Dimension extends number>
    extends VectorSpaceBase<Dimension, Vector<Dimension>>
    implements VectorSpaceLike<Dimension, Vector<Dimension>>
{
    constructor() {
        super();
    }

    createVector(...tuple: NumberTuplePrimitive<Dimension>): Vector<Dimension> {
        return new Vector(...tuple);
    }
}
