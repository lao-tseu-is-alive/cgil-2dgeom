const poi = require('poi')
const config = require('./poi.config')

const app = poi(config)
const webpackConfig = app.createWebpackConfig()

module.exports = {
  extends: [
    'xo',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: webpackConfig
      }
    }
  }
}