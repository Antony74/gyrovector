"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GyrovectorSpaceFactory = void 0;
const vectorXY_1 = require("./vectorXY");
const gyrovectorXY_1 = require("./gyrovectorXY");
const vector_1 = require("./vector");
const gyrovector_1 = require("./gyrovector");
/**
 * A factory class for creating instances of vector spaces and gyrovector spaces
 * based on dimension and curvature.
 */
class GyrovectorSpaceFactory {
    /**
     * Creates a gyrovector space
     *
     * @param dimension - The number of spatial dimensions
     * @param curvature - Curvature of space.  Negative for hyperbolic space, zero for Euclidean space,
     * positive for spherical space.
     * @returns A specific instance of vector space or a gyrovector space
     *
     * @example
     * ```ts
     * const space = GyrovectorSpaceFactory.create(2, 0.5);
     * ```
     */
    static create(dimension, curvature) {
        if (dimension === 2) {
            if (curvature === 0) {
                return new vectorXY_1.VectorSpaceXY();
            }
            else {
                return new gyrovectorXY_1.GyrovectorXYSpace(curvature);
            }
        }
        else {
            if (curvature === 0) {
                return new vector_1.VectorSpace();
            }
            else {
                return new gyrovector_1.GyrovectorSpace(curvature);
            }
        }
    }
}
exports.GyrovectorSpaceFactory = GyrovectorSpaceFactory;
//# sourceMappingURL=gyrovectorSpaceFactory.js.map