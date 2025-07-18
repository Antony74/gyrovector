# gyrovector

Generalized immutable vector classes for hyperbolic, Euclidean, and spherical geometries. Supports any number of spatial dimensions and any curvature of space.

## Contents

- [This package welcomes P5 creative coders](#this-package-welcomes-p5-creative-coders)
- [Getting started](#getting-started)
- [Examples](#examples)
- [Documentation](#documentation)
- [Performance](#performance)
- [Gyrovector resources](#gyrovector-resources)

## This package welcomes P5 creative coders

Non-Euclidean geometry is weird, let't try to have some fun with it!

This package requires no familiarity with [P5](https://p5js.org/) and can be used entirely independently of P5, and indeed has no production dependencies at all. But, if you've ever used the [p5.Vector](https://p5js.org/reference/p5/p5.Vector/) class, then you're going to feel at home... at least until curved space starts messing with your mind! ;-)

After you've called the not-exactly-catchily titled `GyrovectorSpaceFactory.create()`, I promise every function name you subsequently encounter will be familiar. However, only a subset `p5.Vector` functions are supported at present.

The vectors here are immutable, so their behavior is not identical - but if you've every had trouble tracking down a bug because you forgot to call `copy()`, you'll probably be grateful for that.

## Getting started

Install the package as usual,

    npm install gyrovector

then in your JavaScript or TypeScript file, you might write something like this:

    import { GyrovectorSpaceFactory } from 'gyrovector';

    const space = GyrovectorSpaceFactory.create(2, 0);

This creates a 2 dimensional vector space with 0 for curvature, so it will be Euclidean. Then we could create a vector.

    const vector = space.createVector(100, 200);

Subsequent calls to functions such as `add()`, `mult()`, `rotate()` will allow us to combine and manipulate vectors.

Conventionally only curvatures of -1 (Hyperbolic), 0 (Euclidean), and 1 (Spherical) are considered. This simplifies some of the calculations, and there's no loss of generality because you can scale your vectors to fit the curvature (note that the unit vector in -1 hyperbolic geometry behaves particularly oddly. When modeling relativistic velocities, I think it represents the speed of light)

Alternatively, if you want your units in pixels, then I suggest starting with a curvature of `1 / (width * height)` for spherical geometry, and tuning it to suit your particular use case. Similarly for hyperbolic geometry, I would start with a curvature of `-1 / (width * height)`. A useful hack or projection given the lack of other projections. More than two dimensions is also difficult to display for the same reason.

Because gyrovectors behave in ways which might be unfamiliar, it is suggested that to begin with you only call `createVector` once and make all your other vectors by rotating, scaling, and adding to this vector. This way of working is very reminiscent of turtle graphics in Logo, but with as many 'turtles' (i.e. vectors) as you like, or can fit into memory.

## [Examples](https://github.com/Antony74/gyrovector/blob/main/examples.md)

## Documentation
