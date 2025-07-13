export type Curvature = {
    value: number;
    tan: (x: number) => number;
    atan: (x: number) => number;
};
export declare const createCurvature: (curvature: number) => Readonly<Curvature>;
