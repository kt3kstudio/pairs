'use strict'

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai', 'jsmockito-jshamcrest', 'browserify'],
    files: ['site/**/*.css', 'test/helper.js', 'test/**/*.js'],
    preprocessors: {'test/**/*.js': ['browserify']},
    browserify: {
      debug: true,
      noParse: ['jquery', 'rx-lite'],
      transform: [['babelify', {presets: ['es2015', 'decorators-legacy'], plugins: ['istanbul']}]]
    },
    coverageReporter: {type: 'lcov'},
    reporters: ['spec', 'coverage'],
    port: 9876,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true
  })
}
