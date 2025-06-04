import { BaseVector } from './baseVector';
import { NumberTuple } from './tuples';

export interface BaseVectorSpace<
    Dimension extends number,
    Gyrovector extends BaseVector<Dimension, Gyrovector>,
> {
    createVector: (...vec: NumberTuple<Dimension>) => Gyrovector;
    add: (u: Gyrovector, v: Gyrovector) => Gyrovector;
    sub: (u: Gyrovector, v: Gyrovector) => Gyrovector;
    mult: (c: number, u: Gyrovector) => Gyrovector;
    div: (c: number, u: Gyrovector) => Gyrovector;
    rotate: (u: Gyrovector, radians: number) => Gyrovector;
}
