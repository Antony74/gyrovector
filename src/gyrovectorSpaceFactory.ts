import { VectorSpaceXY } from './vectorXY';
import { GyrovectorXYSpace } from './gyrovectorXY';

export class GyrovectorSpaceFactory {
    static create(dimension: 2, curvature: 0): VectorSpaceXY;

    static create(dimension: 2, curvature: number): GyrovectorXYSpace;

    static create(dimension: number, curvature: number) {
        if (dimension !== 2) {
            throw new Error(
                `createGyrovectorFactory currently only supports 2 dimensions`,
            );
        }

        if (curvature === 0) {
            return new VectorSpaceXY();
        } else {
            return new GyrovectorXYSpace(curvature);
        }
    }
}
