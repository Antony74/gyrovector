"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorSpaceXY = exports.VectorXY = void 0;
const vectorSpaceBase_1 = require("./vectorSpaceBase");
/**
 * Two dimensional Euclidean vector represented by the fields {x, y}
 */
class VectorXY {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        return new VectorXY(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new VectorXY(this.x - v.x, this.y - v.y);
    }
    mult(c) {
        return new VectorXY(c * this.x, c * this.y);
    }
    div(c) {
        return new VectorXY(this.x / c, this.y / c);
    }
    rotate(radians) {
        return new VectorXY((this.x * Math.cos(radians)) - (this.y * Math.sin(radians)), (this.x * Math.sin(radians)) + (this.y * Math.cos(radians)));
    }
    array() {
        return [this.x, this.y];
    }
    dot(v) {
        return (this.x * v.x) + (this.y * v.y);
    }
    magSq() {
        return this.dot(this);
    }
    mag() {
        return Math.sqrt(this.magSq());
    }
}
exports.VectorXY = VectorXY;
/**
 * Two dimensional Euclidean vector space where the vectors are represented by the fields {x, y}
 */
class VectorSpaceXY extends vectorSpaceBase_1.VectorSpaceBase {
    createVector(x, y) {
        return new VectorXY(x, y);
    }
}
exports.VectorSpaceXY = VectorSpaceXY;
//# sourceMappingURL=vectorXY.js.map