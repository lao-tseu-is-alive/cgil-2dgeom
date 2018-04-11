# cgil-geom2d
a light 2d geometry utility classes like Point, Line written in ES6 Javascript (~12k for the CommonJS lib).

[![Build Status](https://travis-ci.org/lao-tseu-is-alive/cgil-2dgeom.png?branch=master)](https://travis-ci.org/lao-tseu-is-alive/cgil-2dgeom)
[![Coverage](https://img.shields.io/codecov/c/github/lao-tseu-is-alive/cgil-2dgeom/master.svg)](https://codecov.io/gh/lao-tseu-is-alive/cgil-2dgeom)
[![Coverage Status](https://coveralls.io/repos/github/lao-tseu-is-alive/cgil-2dgeom/badge.svg?branch=master)](https://coveralls.io/github/lao-tseu-is-alive/cgil-2dgeom?branch=master)
[![HitCount](http://hits.dwyl.io/lao-tseu-is-alive/cgil-2dgeom.svg)](http://hits.dwyl.io/lao-tseu-is-alive/cgil-2dgeom)

this code is licensed under the terms of the MIT License.

[Documentation](https://lao-tseu-is-alive.github.io/cgil-2dgeom/docs/) generated from source with [esdoc](https://esdoc.org/)

## Using it inside the browser
you can download the UMD library [file dist/geom2d.min.js](https://raw.githubusercontent.com/lao-tseu-is-alive/cgil-2dgeom/master/dist/geom2d.min.js)
directy to your computer 
then you just need to include it as usual (adapting the path to your case):
```html
<script src="dist/geom2d.min.js"></script>
```
you can see an example above 

you can get a nice explanation for the various library formats in [this medium article](https://medium.com/computed-comparisons/commonjs-vs-amd-vs-requirejs-vs-es6-modules-2e814b114a0b)

but very basically 
 - cjs (commonjs2): You will use this format in a build tool, it excludes all modules in node_modules folder from bundled files.
 - umd: You will use this format directly in browser, all 3rd-party packages (dependencies) will be bundled within.


## Installation with npm

Inside an already created npm project directory (do you have a package.json in it ?) 
you can as usual install `cgil-geom2d` in the shell with :

```bash
npm install cgil-geom2d --save
```

then you can import/require the CommonJS bundle in **dist/geom2d.cjs.js** 


## Example
let's use the library Point class to create a nice 12 petal's flowers using a polar equation like this : 
**r = a sin 6θ**

[Jump to the full example file](https://lao-tseu-is-alive.github.io/cgil-2dgeom/examples/example_UMD_flower.html)

![alt text](https://raw.githubusercontent.com/lao-tseu-is-alive/cgil-2dgeom/master/examples/images/cgil-geom2d_12_petals_flower_example.png "Using the geom2d.Point class to create a nice 12 petal's flowers from a polar equation")

```html
<script src="../dist/geom2d.min.js"></script>
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
        let radius = petalLength * Math.sin(6 * geom2d.utils.getRadians(angle)) // need to convert to radians for Math.sin        
        let TempPoint = geom2d.Point.fromPolar(radius, angle)
        // move the point so it's centered on the svg 
        TempPoint.moveRel(offsetX,offsetY)
        coordinatesString += TempPoint.toString(',', false)  + ' '
  }  
  // now update the points attributes in the existing svg polyline to display the flower on screen
  ElPolyPolarGraph.setAttribute('points', coordinatesString)  
```
 
 [You can find other polar equations here](https://faculty.math.illinois.edu/~rasekh2/math231(s2016)/PolarEquations.pdf)

## Develop 
you can clone this repository with a git clone
then run a npm install in the cloned directory  
and use the various scripts inside package.json to help you work

[Travis CI](https://travis-ci.org/lao-tseu-is-alive/cgil-2dgeom/)

### run unit tests with

```bash
npx jest -i --watch
```

or just
```bash
npm run test
```

### run eslint with

```bash
npm run lint
```

