"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCurvature = void 0;
const tan = (curvature) => (x) => {
    if (curvature < 0) {
        return ((1 / Math.sqrt(-curvature)) * Math.tanh(Math.sqrt(-curvature) * x));
    }
    else if (curvature === 0) {
        return x;
    }
    else {
        return (1 / Math.sqrt(curvature)) * Math.tan(Math.sqrt(curvature) * x);
    }
};
const atan = (curvature) => (x) => {
    if (curvature < 0) {
        return ((1 / Math.sqrt(-curvature)) * Math.atanh(Math.sqrt(-curvature) * x));
    }
    else if (curvature === 0) {
        return x;
    }
    else {
        return (1 / Math.sqrt(curvature)) * Math.atan(Math.sqrt(curvature) * x);
    }
};
const createCurvature = (curvature) => {
    return { value: curvature, tan: tan(curvature), atan: atan(curvature) };
};
exports.createCurvature = createCurvature;
//# sourceMappingURL=curvatureDependentTrigonometricFunctions.js.map