const poi = require('poi')
const config = require('./poi.config-umd')

const app = poi(config)
const webpackConfig = app.createWebpackConfig()

module.exports = {
  extends: [
    'standard'
    /*,
    'xo',
    'plugin:import/errors',
    'plugin:import/warnings'
    */
  ],
  env: {
    'browser': true,
    'jest': true
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: webpackConfig
      }
    }
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'semi': [2, 'never'],
    'indent': ["error", 2],
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}