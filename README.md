# gyrovector

Generalized immutable vector classes for hyperbolic, Euclidean, and spherical geometries. Supports any number of spatial dimensions and any curvature of space.

## This package welcomes P5 creative coders

Non-Euclidean geometry is weird, let't try to have some fun with it!

This package requires no familiarity with [P5](https://p5js.org/) and can be used entirely independently of P5, and indeed has no production dependencies at all. But, if you've ever used the [p5.Vector](https://p5js.org/reference/p5/p5.Vector/) class, then you're going to feel at home... at least until curved space starts messing with your mind! ;-)

After you've called the not-exactly-catchily titled `GyrovectorSpaceFactory.create()`, I promise every function name you subsequently encounter will be familiar. However, only a subset `p5.Vector` functions are supported at present.

The vectors here are immutable, so their behavior not identical - but if you've every had trouble tracking down a bug because you forgot to call `copy()`, you'll probably be grateful for that.

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

### Class GyrovectorSpaceFactory

A factory class for creating instances of vector spaces and gyrovector spaces
based on dimension and curvature.

#### Method: static create()

> create(`dimension`, `curvature`)

Creates a gyrovector space

##### Parameters

###### dimension

The number of spatial dimensions

###### curvature

Curvature of space. Negative for hyperbolic space, zero for Euclidean space,
positive for spherical space.

##### Returns

A specific instance of vector space or a gyrovector space

##### Example

```ts
const space = GyrovectorSpaceFactory.create(2, 0.5);
```

### Class VectorSpaceLike

A generic type representing vector space or gyrovector space.

#### Method: add()

> add(`u`, `v`)

Adds two vectors.

##### Parameters

###### u

The first vector

###### v

The second vector

##### Returns

A vector representing the sum of the addition. The order of the parameters matters
(except in Euclidean space) because gyrovector/mobius addition is not associative.

##### Example

```ts
const result = space.add(u, v);
```

#### Method: createVector()

> createVector(`tuplePrimitive`)

Constructs a new vector.

##### Parameters

###### tuplePrimitive

An array of the correct length for the number of dimensions in this vector space

##### Returns

A new vector instance

##### Example

```ts
const v = space.createVector(1, 2, 3);
```

#### Method: div()

> div(`c`, `u`)

Divides a vector by a scalar.

##### Parameters

###### c

The scalar divisor

###### u

The vector to divide

##### Returns

The resulting vector from u / c

##### Example

```ts
const result = space.div(2, u);
```

#### Method: mult()

> mult(`c`, `u`)

Multiplies a vector by a scalar.

##### Parameters

###### c

The scalar multiplier

###### u

The vector to scale

##### Returns

A new scaled vector

##### Example

```ts
const result = space.mult(2, u);
```

#### Method: rotate()

> rotate(`u`, `radians`, `firstAxis`, `secondAxis`)

Rotates a vector in a specified plane by a given angle (in radians).

##### Parameters

###### u

The vector to rotate

###### radians

The angle of rotation in radians

###### firstAxis

The first axis in the plane of rotation (optional)

###### secondAxis

The second axis in the plane of rotation (optional)

##### Returns

A new rotated vector

##### Example

```ts
const result = space.rotate(u, Math.PI / 2, 0, 1);
```

#### Method: sub()

> sub(`u`, `v`)

Subtracts one vector from another.

##### Parameters

###### u

The vector to subtract from

###### v

The vector to subtract

##### Returns

A vector representing the result of the subtraction.

##### Example

```ts
const result = space.sub(u, v);
```

### Class VectorLike

A generic type representing vector or gyrovector.

#### Method: add()

> add(`v`)

##### Parameters

###### v

The vector to add

##### Returns

A new vector representing the sum

##### Example

```ts
const result = u.add(v);
```

#### Method: array()

> array()

##### Parameters

##### Returns

##### Example

```ts
const coords = v.array(); // e.g., [1, 2, 3]
```

#### Method: div()

> div(`c`)

##### Parameters

###### c

The scalar divisor

##### Returns

A new vector representing the result of the division

##### Example

```ts
const result = u.div(2);
```

#### Method: mult()

> mult(`c`)

##### Parameters

###### c

The scalar multiplier

##### Returns

A new vector representing the result of the multiplication

##### Example

```ts
const result = u.mult(2);
```

#### Method: rotate()

> rotate(`radians`, `firstAxis`, `secondAxis`)

##### Parameters

###### radians

The rotation angle in radians

###### firstAxis

The first axis in the plane of rotation (optional)

###### secondAxis

The second axis in the plane of rotation (optional)

##### Returns

The rotated vector

##### Example

```ts
const rotated = v.rotate(Math.PI / 2, 0, 1);
```

#### Method: sub()

> sub(`v`)

##### Parameters

###### v

The vector to subtract

##### Returns

A new vector representing the result of the substraction

##### Example

```ts
const result = u.sub(v);
```

### Class Gyrovector

n-dimensional gyrovector represented by an array of the correct length

### Class GyrovectorXY

2-dimensional gyrovector represented by the fields {x, y}

### Class Vector

n-dimensional Euclidean vector represented by an array of the correct length

### Class VectorXY

Two dimensional Euclidean vector represented by the fields {x, y}

## Performance

- The best gyrovector performance would be achieved by using the GPU instead of the CPU. This is beyond the scope of a package which runs purely on the JavaScript platform. Maybe try looking at the shaders in [HyperEngine](https://github.com/HackerPoet/HyperEngine)?

- If you have more than one (affine) transform which you wish to perform on more than one vector, then matrix arithmetic is a more efficient way to go about this. I haven't figured out how to perform [the equivalent operations in gyrovector space yet](https://www.youtube.com/watch?v=pXWRYpdYc7Q&list=PLh9DXIT3m6N4qJK9GKQB3yk61tVe6qJvA&index=4&t=192s).

- To properly explore performance, it would be nessasary to write some benchmarks for this package, so that the effectiveness of any performance improvements could easily be measured (and any future performance regressions monitored for).

- The design decision to make these gyrovectors immutable has a performance cost. The justification for this is that I wish the package to be as easy use as possible. However, these have also used these internally.

With those caveats out of the way, the big thing this package does for performance is to provide multiple implementations for gyrovectors, so if you're using Euclidean space and/or two dimensional space, a faster implementation is available. This is abstracted from the user by the [GyrovectorSpaceFactory.create](#method-static-create) method, which picks the best available class to represent the gyrovector space which you have requested.

This approach could be taken further. An implementation specific to three dimensions might be particularly helpful, and could add additional helper methods rotateX, rotateY, and rotateZ. Also the curvatures -1 and +1 might benefit from their own implementations, as the math simplifies slightly in these cases, but not to the same extent it simplifies in Euclidean space, where many terms which are due to be multiplied by zero can simply be ignored.

Another small thing which has been done for performance is to favor inheritance over composition. Usually you'd be advised to do exactly the opposite for maintainability, but composition has a slight overhead, which perhaps should be avoided for something as low level as a vector.

## Gyrovector resources

- [A Universal Model for Hyperbolic, Euclidean and Spherical Geometries](https://andbloch.github.io/K-Stereographic-Model/)
- [Gyrovectors (GitHub)](https://github.com/joshgreaves/Gyrovectors) - JavaScript example - Playing with Gyrovectors.
- [Hyperbolica (YouTube)](https://www.youtube.com/playlist?list=PLh9DXIT3m6N4qJK9GKQB3yk61tVe6qJvA) - Devlog for the non-Euclidean game Hyperbolica.
- [HyperEngine (GitHub)](https://github.com/HackerPoet/HyperEngine) - The Non-Euclidean Unity Backend for Hyperbolica.

_Another way to make a gyrovector space look flat is to zoom in far enough. That means we can never know our universe is Euclidean; it might be that we simply have not zoomed out far enough._
