// Karma configuration
// Generated on Sun Dec 04 2016 21:21:31 GMT-0300 (Argentina Standard Time)
const webpackConfig =require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      {pattern: 'public/test/*.test.js', watched: false},
      {pattern: 'public/test/**/*.test.js', watched: false}
    ],

    preprocessors: {
      'public/test/*.test.js': ['webpack'],
      'public/test/**/*.test.js': ['webpack']
    },

    webpack: webpackConfig,

    // list of files to exclude
    exclude: [
    ],



    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],
    singleRun: true,
    browsers: ['PhantomJS'],
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    concurrency: Infinity
  })
}
