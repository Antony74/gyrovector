import { VectorLike } from './vectorLike';
import { VectorSpaceBase } from './vectorSpaceBase';
import { WithCreateVector } from './vectorSpaceLike';

export class VectorXY implements VectorLike<VectorXY> {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

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

    array(): Readonly<[number, number]> {
        return [this.x, this.y];
    }

    dot(v: VectorXY): number {
        return (this.x * v.x) + (this.y * v.y);
    }

    magSq() {
        return this.dot(this);
    }

    mag() {
        return Math.sqrt(this.magSq());
    }
}

export class VectorSpaceXY
    extends VectorSpaceBase<VectorXY>
    implements WithCreateVector<2, VectorXY>
{
    createVector(x: number, y: number) {
        return new VectorXY(x, y);
    }
}
