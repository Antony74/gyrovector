import { GyrovectorXY } from './gyrovectorXY';
import { VectorSpace } from './vectorSpace';
import { VectorXY } from './vectorXY';

export class GyrovectorSpaceFactory {
    static create(dimension: 2, curvature: 0): VectorSpace<2, VectorXY>;
    
    static create(
        dimension: 2,
        curvature: number,
    ): VectorSpace<2, GyrovectorXY>;
}
