import { VectorXYSpace } from './vectorXYSpace';
import { GyrovectorXYSpace } from './gyrovectorXYSpace';

export class GyrovectorSpaceFactory {
    static create(dimension, curvature) {
        if (dimension !== 2) {
            throw new Error(
                `createGyrovectorFactory currently only supports 2 dimensions`,
            );
        }

        if (curvature === 0) {
            return new VectorXYSpace();
        } else {
            return new GyrovectorXYSpace(curvature);
        }
    }
}
