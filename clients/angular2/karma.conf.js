module.exports = function(config) {
  var dependencies = require('./package.json').dependencies;
  var excludedDependencies = [
    'systemjs', 'zone.js', 'font-awesome', 'bootswatch'
  ];
  var configuration = {
    basePath: '',

    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage'],

    preprocessors: {
      'tmp/app/**/!(*.spec)+(.js)': ['coverage'],
      'tmp/app/**/*.js': ['sourcemap']
    },

    // Generate json used for remap-istanbul
    coverageReporter: {
      dir: 'report/',
      reporters: [
        { type: 'json', subdir: 'report-json' }
      ]
    },

    files: [
      'node_modules/traceur/bin/traceur-runtime.js',
      // IE required polyfills, in this exact order
      'node_modules/es6-shim/es6-shim.min.js',
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',
      'node_modules/systemjs/dist/system.src.js',

      'systemjs.conf.js',
      'karma-test-shim.js',

      { pattern: 'tmp/app/**/*.js', included: false },
      { pattern: 'tmp/test/test-helpers/*.js', included: false },

      // paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      { pattern: 'app/**/*.html', included: false },
      { pattern: 'app/**/*.css', included: false },

      // paths to support debugging with source maps in dev tools
      { pattern: 'app/**/*.ts', included: false, watched: false },
      { pattern: 'tmp/app/**/*.js.map', included: false, watched: false }
    ],

    // proxied base paths
    proxies: {
      // required for component assests fetched by Angular's compiler
      "/app/": "/base/app/",
      "/tmp/app/": "/base/tmp/app/",
      "/tmp/test/": "/base/tmp/test/",
      "/node_modules/": "/base/node_modules/"
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
  };

  Object.keys(dependencies).forEach(function(key) {
    if(excludedDependencies.indexOf(key) >= 0) { return; }

    configuration.files.push({
        pattern: 'node_modules/' + key + '/**/*.js',
        included: false,
        watched: false
    });
  });

  if (process.env.APPVEYOR) {
    configuration.browsers = ['IE'];
    configuration.singleRun = true;
    configuration.browserNoActivityTimeout = 90000; // Note: default value (10000) is not enough
  }

  config.set(configuration);
}
