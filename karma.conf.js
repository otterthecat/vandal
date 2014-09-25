module.exports = function(config) {
    config.set({

        'basePath': '',

        'frameworks': ['mocha', 'commonjs'],

        'files': [
            'test/specs/bundles/vandalTest.js'
        ],

        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'

        'preprocessors': {
           'test/specs/bundles/vandalTest.js': ['commonjs', 'coverage']
        },

        'reporters': ['coverage','progress'],

        'coverageReporter': {
          'type' : 'html',
          'dir' : 'coverage/'
        },

        // web server port
        'port': 9876,

        // enable / disable colors in the output (reporters and logs)
        'colors': true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        'logLevel': config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        'autoWatch': false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        'browsers': ['Firefox'],

        // If browser does not capture in given timeout [ms], kill it
        'captureTimeout': 5000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        'singleRun': true,

    })
}
