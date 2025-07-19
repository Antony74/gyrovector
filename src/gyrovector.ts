import { VectorLike } from './vectorLike';

import {
    createCurvature,
    Curvature,
} from './curvatureDependentTrigonometricFunctions';

import { VectorSpaceBase } from './vectorSpaceBase';
import { VectorSpaceLike } from './vectorSpaceLike';
import { mobiusAdd, mobiusMult } from './mobius';
import { NumberTuple, NumberTuplePrimitive } from './tuples';
import { Vector } from './vector';

/**
 * n-dimensional gyrovector represented by an array of the correct length
 */
export class Gyrovector<Dimension extends number>
    implements VectorLike<Dimension, Gyrovector<Dimension>>
{
    private _tuple: NumberTuple<Dimension>;

    constructor(
        public readonly curvature: Curvature,
        ...tuple: NumberTuplePrimitive<Dimension>
    ) {
        this._tuple = new NumberTuple(tuple);
    }

    array(): Readonly<NumberTuplePrimitive<Dimension>> {
        return this._tuple.tuple;
    }

    add(u: Gyrovector<Dimension>): Gyrovector<Dimension> {
        const _u = new Vector<Dimension>(...u._tuple.tuple);
        const _v = new Vector<Dimension>(...this._tuple.tuple);

        const result = mobiusAdd<Dimension, Vector<Dimension>>(
            _u,
            _v,
            this.curvature,
        );

        return new Gyrovector(this.curvature, ...result.tuple.tuple);
    }

    sub(v: Gyrovector<Dimension>): Gyrovector<Dimension> {
        return this.add(v.mult(-1));
    }

    mult(c: number): Gyrovector<Dimension> {
        const u = new Vector<Dimension>(...this._tuple.tuple);
        const result = mobiusMult<Dimension, Vector<Dimension>>(
            c,
            u,
            this.curvature,
        );
        return new Gyrovector(this.curvature, ...result.tuple.tuple);
    }

    div(c: number): Gyrovector<Dimension> {
        return this.mult(1 / c);
    }

    rotate(radians: number): Gyrovector<Dimension> {
        const result = new Vector<Dimension>(...this._tuple.tuple).rotate(
            radians,
        );
        return new Gyrovector(this.curvature, ...result.tuple.tuple);
    }
}

/**
 * n-dimensional gyrovector space for gyrovectors represented by an array of the correct length
 */
export class GyrovectorSpace<Dimension extends number>
    extends VectorSpaceBase<Dimension, Gyrovector<Dimension>>
    implements VectorSpaceLike<Dimension, Gyrovector<Dimension>>
{
    curvature;

    constructor(curvature: number) {
        super();
        this.curvature = createCurvature(curvature);
    }

    createVector(
        ...tuple: NumberTuplePrimitive<Dimension>
    ): Gyrovector<Dimension> {
        return new Gyrovector(this.curvature, ...tuple);
    }
}
