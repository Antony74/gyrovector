import { VectorSpaceXY } from './vectorXY';
import { GyrovectorXYSpace } from './gyrovectorXY';
import { VectorSpace } from './vector';
import { GyrovectorSpace } from './gyrovector';

export class GyrovectorSpaceFactory {
    static create(dimension: 2, curvature: 0): VectorSpaceXY;
    static create(dimension: 2, curvature: number): GyrovectorXYSpace;

    static create<Dimension extends number>(
        dimension: Dimension,
        curvature: 0,
    ): VectorSpace<Dimension>;

    static create<Dimension extends number>(
        dimension: Dimension,
        curvature: number,
    ): GyrovectorSpace<Dimension>;

    static create(dimension: number, curvature: number) {
        if (dimension === 2) {
            if (curvature === 0) {
                return new VectorSpaceXY();
            } else {
                return new GyrovectorXYSpace(curvature);
            }
        } else {
            if (curvature === 0) {
                return new VectorSpace();
            } else {
                return new GyrovectorSpace(curvature);
            }
        }
    }
}
