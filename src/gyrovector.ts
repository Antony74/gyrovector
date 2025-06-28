import { VectorLike } from './vectorLike';

import {
    createCurvature,
    Curvature,
} from './curvatureDependentTrigonometricFunctions';

import { VectorSpaceBase } from './vectorSpaceBase';
import { WithCreateVector } from './vectorSpaceLike';
import { mobiusAdd, mobiusMult } from './mobius';
import { NumberTuple, NumberTuplePrimitive } from './tuples';
import { Vector } from './vector';

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
        const _u = new Vector<Dimension>(...this._tuple.tuple);
        const _v = new Vector<Dimension>(...v._tuple.tuple).mult(-1);

        const result = mobiusAdd<Dimension, Vector<Dimension>>(
            _u,
            _v,
            this.curvature,
        );

        return new Gyrovector(this.curvature, ...result.tuple.tuple);
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

export class GyrovectorSpace<Dimension extends number>
    extends VectorSpaceBase<Dimension, Gyrovector<Dimension>>
    implements WithCreateVector<Dimension, Gyrovector<Dimension>>
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
