module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-mocha-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    client: {
      clearContext: false
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      reporters: [
        { type: 'html', subdir: 'html-report' },
        { type: 'lcov', subdir: 'lcov-report' }
      ],
      fixWebpackSourcePaths: true
    },
    reporters: ['mocha', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false
  });
};
