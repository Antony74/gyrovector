"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorSpace = exports.Vector = void 0;
const tuples_1 = require("./tuples");
const vectorSpaceBase_1 = require("./vectorSpaceBase");
/**
 * n-dimensional Euclidean vector represented by an array of the correct length
 */
class Vector {
    constructor(...tuple) {
        this._tuple = new tuples_1.NumberTuple(tuple);
    }
    get tuple() {
        return this._tuple;
    }
    array() {
        return this._tuple.tuple;
    }
    add(v) {
        return new Vector(...this._tuple.map((value, index) => {
            return value + v.tuple.at(index);
        }).tuple);
    }
    sub(v) {
        return new Vector(...this._tuple.map((value, index) => {
            return value - v._tuple.at(index);
        }).tuple);
    }
    mult(c) {
        return new Vector(...this._tuple.map((value) => {
            return c * value;
        }).tuple);
    }
    div(c) {
        const reciprocal = 1 / c;
        return new Vector(...this._tuple.map((value) => {
            return reciprocal * value;
        }).tuple);
    }
    rotate(radians, firstAxis = 0, secondAxis = 1) {
        const x = this._tuple.at(firstAxis);
        const y = this._tuple.at(secondAxis);
        return new Vector(...this._tuple.map((value, index) => {
            if (index === firstAxis) {
                return (x * Math.cos(radians)) - (y * Math.sin(radians));
            }
            else if (index === secondAxis) {
                return (x * Math.sin(radians)) + (y * Math.cos(radians));
            }
            else {
                return value;
            }
        }).tuple);
    }
    dot(v) {
        return this._tuple.reduce((acc, value, index) => {
            return acc + (value * v._tuple.at(index));
        }, 0);
    }
    magSq() {
        return this.dot(this);
    }
    mag() {
        return Math.sqrt(this.magSq());
    }
}
exports.Vector = Vector;
/**
 * n-dimensional Euclidean vector space for vectors represented by an array of the correct length
 */
class VectorSpace extends vectorSpaceBase_1.VectorSpaceBase {
    constructor() {
        super();
    }
    createVector(...tuple) {
        return new Vector(...tuple);
    }
}
exports.VectorSpace = VectorSpace;
//# sourceMappingURL=vector.js.map