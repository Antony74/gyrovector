import { NumberTuple } from './tuples';

export interface BaseVector<Dimension extends number, Gyrovector> {
    array(): NumberTuple<Dimension>;
    add(v: Gyrovector): Gyrovector;
    sub(v: Gyrovector): Gyrovector;
    mult(c: number): Gyrovector;
    div(c: number): Gyrovector;
    rotate(radians: number): Gyrovector;
}
