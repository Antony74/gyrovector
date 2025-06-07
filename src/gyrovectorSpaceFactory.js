import { createVectorXYSpace } from './vectorXY';
import { createGyrovectorXYSpace } from './gyrovectorXY';

export class GyrovectorSpaceFactory {
    static create(dimension, curvature) {
        if (dimension !== 2) {
            throw new Error(
                `createGyrovectorFactory currently only supports 2 dimensions`,
            );
        }

        if (curvature === 0) {
            return createVectorXYSpace();
        } else {
            return createGyrovectorXYSpace(curvature);
        }
    }
}
