'use strict'

const IS_COV = process.env.COV === 'true'

const babelConfig = require('./package').babel
const reporters = ['spec']

if (IS_COV) {
  babelConfig.plugins = ['istanbul']
  reporters.push('coverage')
}

module.exports = config => config.set({
  frameworks: ['mocha', 'chai', 'jsmockito-jshamcrest', 'browserify'],
  files: [
    'site/**/*.css',
    'test/helper.js',
    'test/**/*.js'
  ],
  preprocessors: {
    'test/**/*.js': ['browserify']
  },
  browserify: {
    debug: true,
    noParse: [
      'jquery',
      'rx-lite',
      'es6-promise',
      'es6-symbol/implement',
      'tether',
      'tether-drop',
      'multiflip',
      'multiflip-bubble',
      '@kt3k/puncher'
    ],
    transform: [['babelify', babelConfig]]
  },
  reporters,
  coverageReporters: {type: 'lcov'},
  autoWatch: false,
  browsers: ['Chrome'],
  singleRun: true
})
