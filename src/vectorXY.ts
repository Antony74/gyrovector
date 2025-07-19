import { VectorLike } from './vectorLike';
import { VectorSpaceBase } from './vectorSpaceBase';
import { VectorSpaceLike } from './vectorSpaceLike';

/**
 * Two dimensional Euclidean vector represented by the fields {x, y}
 */
export class VectorXY implements VectorLike<2, VectorXY> {
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

    rotate(
        radians: number,
        firstAxis: number = 0,
        secondAxis: number = 1,
    ): VectorXY {
        if (firstAxis === 0 && secondAxis === 1) {
            return new VectorXY(
                (this.x * Math.cos(radians)) - (this.y * Math.sin(radians)),
                (this.x * Math.sin(radians)) + (this.y * Math.cos(radians)),
            );
        } else if (firstAxis === 1 && secondAxis === 0) {
            return new VectorXY(
                (this.y * Math.cos(radians)) - (this.x * Math.sin(radians)),
                (this.y * Math.sin(radians)) + (this.x * Math.cos(radians)),
            );
        } else {
            throw new Error(
                `VectorXY.rotate(${radians}, ${firstAxis}, ${secondAxis}) called with invalid axes`,
            );
        }
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

/**
 * Two dimensional Euclidean vector space where the vectors are represented by the fields {x, y}
 */
export class VectorSpaceXY
    extends VectorSpaceBase<2, VectorXY>
    implements VectorSpaceLike<2, VectorXY>
{
    createVector(x: number, y: number) {
        return new VectorXY(x, y);
    }
}
