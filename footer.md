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
