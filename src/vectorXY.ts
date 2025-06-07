import { VectorLike } from './vectorLike';

export class VectorXY implements VectorLike<2, VectorXY> {
    constructor(
        public x: number,
        public y: number,
    ) {}

    add(v: VectorXY): VectorXY {
        return new VectorXY(this.x + v.x, this.y + v.y);
    }

    sub(v: VectorXY): VectorXY {
        return new VectorXY(this.x - v.x, this.y - v.y);
    }

    mult(c: number): VectorXY {
        return new VectorXY(c * this.x, c * this.y);
    }

    div(c: number): VectorXY {
        return new VectorXY(this.x / c, this.y / c);
    }

    rotate(radians: number): VectorXY {
        return new VectorXY(
            (this.x * Math.cos(radians)) - (this.y * Math.sin(radians)),
            (this.x * Math.sin(radians)) + (this.y * Math.cos(radians)),
        );
    }

    array(): [number, number] {
        return [this.x, this.y];
    }

    dot(v: VectorXY): number {
        return (this.x * v.x) + (this.y * v.y);
    }

    magSq() {
        return this.dot(this);
    }

    mag() {
        return this.magSq();
    }
}
