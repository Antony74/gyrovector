export interface VectorLike<Vector> {
    array(): ReadonlyArray<number>;
    add(v: Vector): Vector;
    sub(v: Vector): Vector;
    mult(c: number): Vector;
    div(c: number): Vector;
    rotate(radians: number, firstAxis?: number, secondAxis?: number): Vector;
}
