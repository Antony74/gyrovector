"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GyrovectorSpace = exports.Gyrovector = void 0;
const curvatureDependentTrigonometricFunctions_1 = require("./curvatureDependentTrigonometricFunctions");
const vectorSpaceBase_1 = require("./vectorSpaceBase");
const mobius_1 = require("./mobius");
const tuples_1 = require("./tuples");
const vector_1 = require("./vector");
/**
 * n-dimensional gyrovector represented by an array of the correct length
 */
class Gyrovector {
    constructor(curvature, ...tuple) {
        this.curvature = curvature;
        this._tuple = new tuples_1.NumberTuple(tuple);
    }
    array() {
        return this._tuple.tuple;
    }
    add(u) {
        const _u = new vector_1.Vector(...u._tuple.tuple);
        const _v = new vector_1.Vector(...this._tuple.tuple);
        const result = (0, mobius_1.mobiusAdd)(_u, _v, this.curvature);
        return new Gyrovector(this.curvature, ...result.tuple.tuple);
    }
    sub(v) {
        return this.add(v.mult(-1));
    }
    mult(c) {
        const u = new vector_1.Vector(...this._tuple.tuple);
        const result = (0, mobius_1.mobiusMult)(c, u, this.curvature);
        return new Gyrovector(this.curvature, ...result.tuple.tuple);
    }
    div(c) {
        return this.mult(1 / c);
    }
    rotate(radians, firstAxis = 0, secondAxis = 1) {
        const result = new vector_1.Vector(...this._tuple.tuple).rotate(radians, firstAxis, secondAxis);
        return new Gyrovector(this.curvature, ...result.tuple.tuple);
    }
}
exports.Gyrovector = Gyrovector;
/**
 * n-dimensional gyrovector space for gyrovectors represented by an array of the correct length
 */
class GyrovectorSpace extends vectorSpaceBase_1.VectorSpaceBase {
    constructor(curvature) {
        super();
        this.curvature = (0, curvatureDependentTrigonometricFunctions_1.createCurvature)(curvature);
    }
    createVector(...tuple) {
        return new Gyrovector(this.curvature, ...tuple);
    }
}
exports.GyrovectorSpace = GyrovectorSpace;
//# sourceMappingURL=gyrovector.js.map