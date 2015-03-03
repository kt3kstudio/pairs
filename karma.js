// Karma configuration
// Generated on Fri Dec 26 2014 15:31:45 GMT+0900 (KST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'jsmockito-jshamcrest'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/subclassjs/index.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/es6-promise/promise.js',
      'bower_components/rxjs/dist/rx.lite.js',

      'src/namespaces.js',
      'src/domain/common/Sprite.js',
      'src/domain/map/WallObject.js',

      'src/**/*.js',

      'spec/helper/polyfill.js',

      'spec/**/*.js'
    ],


    // list of files to exclude
    exclude: [
      'src/**/*index.js',
      '**/*.swp'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {

        'src/**/*.js': ['coverage']

    },


    coverageReporter: {

        type: 'lcov',
        dir: 'coverage/'

    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
        'Chrome'
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
