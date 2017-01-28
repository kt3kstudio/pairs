'use strict'

const IS_COV = process.env.COV === 'true'
const IS_WATCH = process.env.WATCH === 'true'

const babelConfig = require('./package').babel
const reporters = ['spec']

let autoWatch = false
let singleRun = true

if (IS_COV) {
  babelConfig.plugins = ['istanbul']
  reporters.push('coverage')
}

if (IS_WATCH) {
  autoWatch = true
  singleRun = false
}

module.exports = config => config.set({
  frameworks: ['mocha', 'chai', 'jsmockito-jshamcrest', 'browserify'],
  files: [
    'test/helper.js',
    'src/**/__tests__/**/*.js',
    'test/**/*.js'
  ],
  preprocessors: {
    'test/**/*.js': ['browserify'],
    'src/**/*.js': ['browserify']
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
  autoWatch,
  singleRun,
  coverageReporters: {type: 'lcov'},
  browsers: ['Chrome']
})
