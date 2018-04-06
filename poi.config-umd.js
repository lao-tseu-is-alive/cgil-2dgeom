/*
 https://medium.com/poi-js/bundle-and-publish-your-vue-componet-like-a-pro-9ce27f9b5f65
 https://poi.js.org/#/recipes/cjs-and-umd-format
 thank's to this file you can just type in the shell:
 poi build
 and you will get commonjs2 library module ready to be used with a build tool.
 the bundle here excludes all modules in node_modules folder from bundled files. no need for external defs :-)
 */
module.exports = {
  entry: './src/index.js',
  filename: {
    js: 'cgil2dgeom.min.js'
  },
  // https://poi.js.org/#/options?id=library
  library: 'cgil2dgeom',
  sourceMap: true,
  html: false,
  // https://poi.js.org/#/recipes/cjs-and-umd-format
  format: 'umd',
  moduleName: 'cgil2dgeom',
  babel: {
    babelrc: true,
    cacheDirectory: true,
    presets: []
  }
}