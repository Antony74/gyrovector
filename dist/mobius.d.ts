import { Curvature } from './curvatureDependentTrigonometricFunctions';
import { VectorLikeWithMeasure } from './vectorLike';
export declare const mobiusAdd: <Dimension extends number, EuclideanVector extends VectorLikeWithMeasure<Dimension, EuclideanVector>>(u: EuclideanVector, v: EuclideanVector, curvature: Curvature) => EuclideanVector;
export declare const mobiusMult: <Dimension extends number, EuclideanVector extends VectorLikeWithMeasure<Dimension, EuclideanVector>>(c: number, u: EuclideanVector, curvature: Curvature) => EuclideanVector;
