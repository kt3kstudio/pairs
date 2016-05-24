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
            noParse: ['jquery'],
            transform: [require('browserify-istanbul')({
                instrumenter: require('isparta'),
                ignore: ['**/spec/**']
            }), 'babelify']
        },
        coverageReporter: {type: 'lcov'},
        reporters: ['spec', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true
    })
}
