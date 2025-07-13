"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorSpaceBase = void 0;
/**
 * Base class making it easy to define vector spaces which are mostly boilerplate
 */
class VectorSpaceBase {
    constructor() { }
    add(u, v) {
        return u.add(v);
    }
    sub(u, v) {
        return u.sub(v);
    }
    mult(c, u) {
        return u.mult(c);
    }
    div(c, u) {
        return u.div(c);
    }
    rotate(u, radians) {
        return u.rotate(radians);
    }
}
exports.VectorSpaceBase = VectorSpaceBase;
//# sourceMappingURL=vectorSpaceBase.js.map