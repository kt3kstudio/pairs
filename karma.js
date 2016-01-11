// Karma configuration
// Generated on Fri Dec 26 2014 15:31:45 GMT+0900 (KST)

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'jsmockito-jshamcrest', 'browserify'],

        // list of files / patterns to load in the browser
        files: [
            'm/javascripts/common.js',
            'm/javascripts/splash.js',
            'm/javascripts/title.js',
            'm/javascripts/map.js',
            'm/javascripts/level.js',

            'spec/helper/polyfill.js',
            'spec/helper/reset.js',

            'spec/**/*.js'
        ],

        // list of files to exclude
        exclude: [
            'src/**/*index.js',
            '**/*.swp'
        ],

        preprocessors: {
            'm/**/*.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: ['babelify']
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
