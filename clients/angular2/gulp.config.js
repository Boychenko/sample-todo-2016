var historyApiFallback = require('connect-history-api-fallback')

module.exports = function () {
    var root = '';
    var app = root + 'app/';
    var test = root + 'test/';
    var tmp = root + 'tmp/';
    var testHelper = test + 'test-helpers/';
    var e2e = test + 'e2e/';
    var assets = root + 'assets/';
    var assetsPath = {
        styles: assets + 'styles/',
        images: assets + 'images/',
        fonts: assets + 'fonts/'
    };
    var index = root + 'index.html';
    var tsFiles = [
        app + '**/!(*.spec)+(.ts)'
    ];
    var tsTestFiles = {
        unit: [app + '**/*.spec.ts'],
        e2e: [e2e + '**/*.ts'],
        helper: [testHelper + '**/*.ts']
    };
    var build = {
        path: 'build/',
        app: 'build/app/',
        fonts: 'build/fonts',
        assetPath: 'build/assets/',
        assets: {
            lib: {
                js: 'lib.js',
                css: 'lib.css'
            }
        }
    };
    var report = {
        path: 'report/'
    };
    var browserSync = {
        dev: {
            port: 3000,
            server: {
                baseDir: './',
                middleware: [
                  historyApiFallback(),
                  {
                    route: "/tmp",
                    handle: function (req, res, next) {
                      var url = req.originalUrl;
                      if (/^\/tmp\/\S*\.html$/i.test(url)) {
                        res.setHeader('Location', url.substring(4));
                        res.writeHead(302);
                        res.end();
                      }
                      next();
                    }
                  }
                ]
            },
            files: [
                "index.html",
                "systemjs.conf.js",
                "assets/styles/main.css",
                "tmp/app/**/*.js",
                "app/**/*.css",
                "app/**/*.html",
                {
                  match: ["/tmp/app/**/*.html"],
                  fn: function (event, file) {
                    console.log(event, file);
                  }
                }
            ]
      },
        prod: {
            port: 3001,
            server: {
                baseDir: './' + build.path,
                middleware: [historyApiFallback()]
            }
        }
    };

    var e2eConfig = {
        seleniumTarget: 'http://127.0.0.1:3000'
    };

    var systemJs = {
        builder: {
            normalize: true,
            minify: true,
            mangle: true,
            runtime: false,
            globalDefs: { DEBUG: false, ENV: 'production' }
        }
    };

    var config = {
        root: root,
        app: app,
        test: test,
        tmp: tmp,
        testHelper: testHelper,
        e2e: e2e,
        e2eConfig: e2eConfig,
        assets: assets,
        index: index,
        build: build,
        report: report,
        assetsPath: assetsPath,
        tsFiles: tsFiles,
        tsTestFiles: tsTestFiles,
        browserSync: browserSync,
        systemJs: systemJs
    };

    return config;
};
