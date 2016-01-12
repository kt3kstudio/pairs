'use stric'

module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['mocha', 'chai', 'jsmockito-jshamcrest', 'browserify'],

        files: [
            'site/javascripts/common.js',
            'site/javascripts/splash.js',
            'site/javascripts/title.js',
            'site/javascripts/map.js',
            'site/javascripts/level.js',

            'spec/helper/polyfill.js',
            'spec/helper/reset.js',

            'spec/**/*.js'
        ],

        exclude: [
            '**/*.swp'
        ],

        preprocessors: {
            'site/**/*.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: [ require('browserify-istanbul')({
                instrumenter: require('isparta')
            })]
        },

        coverageReporter: {
            type: 'lcov',
            dir: 'coverage/'
        },

        reporters: ['spec', 'coverage'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['Chrome'],

        singleRun: true

    })

}
