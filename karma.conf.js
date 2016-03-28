var webpackConfig = require('./webpack.config')
// console.log(webpackConfig)

// Reference: http://karma-runner.github.io/0.12/config/configuration-file.html
module.exports = function karmaConfig(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './node_modules/jasmine-async-sugar/jasmine-async-sugar.js',

      { pattern: './src/tests.webpack.js', watched: false }

      // Grab all files in the app folder that contain .test.
      // 'src/*.spec.js',
      // 'src/**/*.spec.js'
    ],

    browsers: ['PhantomJS'],

    reporters: [
      'dots',
      'junit',

      // Reference: https://github.com/mlex/karma-spec-reporter
      // Set reporter to print detailed results to console
      'spec',

      // Reference: https://github.com/karma-runner/karma-coverage
      // Output code coverage files
      'coverage'
    ],

    junitReporter: {
      outputDir: 'test-reports/unit-test-report/',
      suite: 'unit'
    },

    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      // './src/**/*.spec.js': ['coverage', 'webpack', 'sourcemap']
      './src/tests.webpack.js': ['webpack', 'sourcemap']

      // 'src/**/*.js': ['webpack'],

      // 'src/**/!(*.spec|*.mock|*-mock|*.e2e|*.po|*.test).js': ['webpack', 'sourcemap']
    },

    singleRun: true,
    colors: true,

    specReporter: {
      maxLogLines: 5,               // limit number of lines logged per test
      suppressErrorSummary: true,   // do not print error summary
      suppressFailed: false,        // do not print information about failed tests
      suppressPassed: false,        // do not print information about passed tests
      suppressSkipped: true,        // do not print information about skipped tests
      showSpecTiming: false         // print the time elapsed for each spec
    },

    // Configure code coverage reporter
    coverageReporter: {
      instrumenters: {isparta: require('isparta')},
      instrumenter: {
        'src/**/*.js': 'isparta'
      },
      dir: 'test-reports/coverage/',
      subdir: normalizationBrowserName,
      reporters: [
        {type: 'html'}, // will generate html report
        {type: 'json'}, // will generate json report file and this report is loaded to make sure failed coverage cause gulp to exit non-zero
        {type: 'lcov'}, // will generate Icov report file and this report is published to coveralls
        {type: 'text-summary'} // it does not generate any file but it will print coverage to console
      ]
    },

    browserNoActivityTimeout: 50000,

    webpack: webpackConfig

  })

  /**
   * Make brower name better
   * @param {string} browser
   * @returns {*}
   */
  function normalizationBrowserName(browser) {
    return browser.toLowerCase().split(/[ /-]/)[0]
  }
}
