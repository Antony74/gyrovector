import { createVectorXYSpace, VectorXY } from './vectorXY';
import { createGyrovectorXYSpace, GyrovectorXY } from './gyrovectorXY';
import { VectorSpace } from './vectorSpace';
import { VectorLikeConstructor } from './vectorLike';

export class GyrovectorSpaceFactory {
    static create(
        dimension: 2,
        curvature: 0,
    ): VectorSpace<2, VectorXY, VectorLikeConstructor<2, VectorXY>>;

    static create(
        dimension: 2,
        curvature: number,
    ): VectorSpace<2, GyrovectorXY, VectorLikeConstructor<2, GyrovectorXY>>;

    static create(dimension: number, curvature: number) {
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
