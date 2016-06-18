'use strict'

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai', 'jsmockito-jshamcrest', 'browserify'],
    files: [
      'site/**/*.css',
      'spec/helper.js',
      'spec/**/*.js'
    ],
    preprocessors: {
      'spec/**/*.js': ['browserify']
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
      transform: ['babelify']
    },
    coverageReporter: {type: 'lcov'},
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  })
}
