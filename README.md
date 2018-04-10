# cgil-2dgeom
a very light 2d geometry utility classes like Point, Line etc..

[![Build Status](https://travis-ci.org/lao-tseu-is-alive/cgil-2dgeom.png?branch=master)](https://travis-ci.org/lao-tseu-is-alive/cgil-2dgeom)
[![Coverage](https://img.shields.io/codecov/c/github/lao-tseu-is-alive/cgil-2dgeom/master.svg)](https://codecov.io/gh/lao-tseu-is-alive/cgil-2dgeom)
[![Coverage Status](https://coveralls.io/repos/github/lao-tseu-is-alive/cgil-2dgeom/badge.svg?branch=master)](https://coveralls.io/github/lao-tseu-is-alive/cgil-2dgeom?branch=master)
[![HitCount](http://hits.dwyl.io/lao-tseu-is-alive/cgil-2dgeom.svg)](http://hits.dwyl.io/lao-tseu-is-alive/cgil-2dgeom)

is licensed under the terms of the MIT License.

## Installation


## Example
let's use the library Point class to create a nice 12 petal's flowers using a polar equation like this : 
**r = a sin 6θ**

[Jump to the full example file](https://lao-tseu-is-alive.github.io/cgil-2dgeom/docs/example_UMD.html)

```html
<script src="../dist/cgil2dgeom.min.js"></script>
<svg height="500" width="500">
  <line  id='xaxis' x1="250" y1="0" x2="250" y2="500" style="stroke:rgb(255,255,255);stroke-width:2" />
  <line  id='yaxis' x1="0" y1="250" x2="500" y2="250" style="stroke:rgb(255,255,255);stroke-width:2" />  
  <polyline id='mypolargraph' points="0,40 40,40 40,80 80,80 80,120 120,120 120,160"  style="fill:white;stroke:red;stroke-width:4" />
  <circle cx="250" cy="250" r="40" stroke="orange" stroke-width="1" fill="yellow" />
</svg>
```

```javascript
  let ElPolyPolarGraph = document.getElementById('mypolargraph')
  let petalLength = 200
  let coordinatesString = '' // to accumulate the points coordinates
  // let's center the drawing on the svg
  const offsetX = 250 
  const offsetY = 250
  // let's iterate over a full 360 degree circle
  for (let angle = 0; angle < 360; angle += 2) {
    // let's draw a 12 petals polar equation : https://faculty.math.illinois.edu/~rasekh2/math231(s2016)/PolarEquations.pdf
    let radius = petalLength * Math.sin(6 * cggeom.utils.getRadians(angle)) // need to convert to radians for Math.sin
    // create the point with the cggeom class
    let TempPoint = cggeom.Point.fromPolar(radius, angle)
    // and move the point so it's centered
    TempPoint.moveRel(offsetX,offsetY)
    coordinatesString += TempPoint.toString(',', false)  + ' '    
  }  
  // now update the points attributes in the existing svg polyline to display the flower on screen
  ElPolyPolarGraph.setAttribute('points', coordinatesString)  
```

Using Jest
https://codecov.io
[Travis CI](https://travis-ci.org/lao-tseu-is-alive/cgil-2dgeom/)

# run unit tests with

```bash
npx jest -i --watch
```

