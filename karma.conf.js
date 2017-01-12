// Karma configuration
// Generated on Fri Dec 09 2016 00:04:26 GMT+0400 (+04)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        './bower_components/angular/angular.js',
        './node_modules/angular-mocks/angular-mocks.js',
        './bower_components/angular-resource/angular-resource.js',
        './bower_components/moment/moment.js',
        './bower_components/ngstorage/ngStorage.js',
        './bower_components/angular-validation/dist/angular-validation.js',
        './bower_components/angular-translate/angular-translate.js',
        './bower_components/angular-loading-bar/build/loading-bar.js',
        './bower_components/angular-material/angular-material.js',
        './bower_components/angular-animate/angular-animate.js',
        './bower_components/angular-aria/angular-aria.js',
        './bower_components/angularcountdown/dist/angularcountdown.js',
        './bower_components/angular-ui-router/release/angular-ui-router.js',
        './bower_components/angular-truncate/src/truncate.js',
        './bower_components/angular-sanitize/angular-sanitize.js',
        './bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
        'app/services/app.js',
        'app/directives/app.js',
        'app/me-hand/router.js',
        'app/me-hand/app.js',
        'app/services/config.service.js',
        'app/services/models.service.js',
        'app/services/utility.service.js',
        'app/components/item/item.controller.js',
        'app/components/item/item.spec.js',
        'app/components/cart/cart.service.js',
        'app/components/cart/cart.controller.js',
        'app/components/cart/cart.spec.js',
        'app/components/includes/header.controller.js',
        'app/components/includes/header.spec.js',
        'app/components/home/home.controller.js',
        'app/components/home/home.spec.js',
        'app/components/order/order.service.js',
        'app/components/order/order.controller.js',
        'app/components/order/order.controller.js',
        'app/components/order/order.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/components/**/*.js': 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
