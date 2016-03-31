var webpackConfig = require('./webpack.config')

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    reporters: [
      'dots',
      'junit',
      'spec',
      'coverage'
    ],

    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    colors: true,
    port: 9876,
    browserNoActivityTimeout: 50000,

    basepath: '',
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './node_modules/jasmine-async-sugar/jasmine-async-sugar.js',

      { pattern: 'webpack.karma.context.js' }
    ],
    preprocessors: { 'webpack.karma.context.js': ['webpack', 'sourcemap'] },
    exclude: [],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },

    junitReporter: {
      outputDir: 'test-reports/unit-test-report/',
      suite: 'unit'
    },
    specReporter: {
      maxLogLines: 5,               // limit number of lines logged per test
      suppressErrorSummary: true,   // do not print error summary
      suppressFailed: false,        // do not print information about failed tests
      suppressPassed: false,        // do not print information about passed tests
      suppressSkipped: true,        // do not print information about skipped tests
      showSpecTiming: false         // print the time elapsed for each spec
    },
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
    }
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
