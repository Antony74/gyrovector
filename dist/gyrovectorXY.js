"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GyrovectorXYSpace = exports.GyrovectorXY = void 0;
const vectorXY_1 = require("./vectorXY");
const curvatureDependentTrigonometricFunctions_1 = require("./curvatureDependentTrigonometricFunctions");
const vectorSpaceBase_1 = require("./vectorSpaceBase");
const mobius_1 = require("./mobius");
/**
 * 2-dimensional gyrovector represented by the fields {x, y}
 */
class GyrovectorXY {
    constructor(curvature, x, y) {
        this.curvature = curvature;
        this.x = x;
        this.y = y;
    }
    array() {
        return [this.x, this.y];
    }
    add(u) {
        const _u = new vectorXY_1.VectorXY(u.x, u.y);
        const _v = new vectorXY_1.VectorXY(this.x, this.y);
        const result = (0, mobius_1.mobiusAdd)(_u, _v, this.curvature);
        return new GyrovectorXY(this.curvature, result.x, result.y);
    }
    sub(v) {
        return this.add(new GyrovectorXY(this.curvature, -v.x, -v.y));
    }
    mult(c) {
        const u = new vectorXY_1.VectorXY(this.x, this.y);
        const result = (0, mobius_1.mobiusMult)(c, u, this.curvature);
        return new GyrovectorXY(this.curvature, result.x, result.y);
    }
    div(c) {
        return this.mult(1 / c);
    }
    rotate(radians, firstAxis = 0, secondAxis = 1) {
        const result = new vectorXY_1.VectorXY(this.x, this.y).rotate(radians, firstAxis, secondAxis);
        return new GyrovectorXY(this.curvature, result.x, result.y);
    }
}
exports.GyrovectorXY = GyrovectorXY;
/**
 * 2-dimensional gyrovector space for gyrovectors represented by the fields {x, y}
 */
class GyrovectorXYSpace extends vectorSpaceBase_1.VectorSpaceBase {
    constructor(curvature) {
        super();
        this.curvature = (0, curvatureDependentTrigonometricFunctions_1.createCurvature)(curvature);
    }
    createVector(x, y) {
        return new GyrovectorXY(this.curvature, x, y);
    }
}
exports.GyrovectorXYSpace = GyrovectorXYSpace;
//# sourceMappingURL=gyrovectorXY.js.map