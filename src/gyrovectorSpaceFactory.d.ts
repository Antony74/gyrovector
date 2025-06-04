import { VectorXYSpace } from './vectorXYSpace';
import { GyrovectorXYSpace } from './gyrovectorXYSpace';

export class GyrovectorSpaceFactory {
    static create(dimension: 2, curvature: 0): VectorXYSpace;
    static create(dimension: 2, curvature: number): GyrovectorXYSpace;
}
