/**
 * Unit and E2E Testing Task
 * ===============================
 */

module.exports = function (gulp, $, options) {

    gulp.task('test:unit', function (done) {

        var path = require('path'),
            glob = require('glob'),
            argv = require('yargs').argv,
            Mocha = require('mocha'),
            webpackCompiler = require('./scripts').compilerTask(gulp, $, options),
            srcTestPath = path.join(process.cwd(), options.paths.src.root, 'test'),
            tmpTestPath = path.join(process.cwd(), options.paths.tmp, '_test'),
            webpackConf,
            watchFiles,
            runner;

        // Instantiate a Mocha instance.
        var mocha = new Mocha({
            reporter: 'nyan'
        });

        if (argv.watch === true) {
            options.isWatching = true;
        }

        mocha.addFile(require.resolve('babel-polyfill'));
        mocha.addFile(srcTestPath + '/setup.js');

        webpackConf = {
            debug: false,
            devtool: false,
            context: srcTestPath,
            entry: {},
            output: {
                path: tmpTestPath,
                filename: '[name].js'
            }
        };

        watchFiles = glob.sync('**/*.spec.js', {
            cwd: srcTestPath
        }).map(function (filepath) {
            var id = filepath.replace(/\.js$/, ''),
                tmpFile = path.join(tmpTestPath, filepath);
            webpackConf.entry[id] = ['./' + filepath];

            mocha.addFile(tmpFile);
            return tmpFile;
        });

        process.on('exit', function () {
            runner && runner.abort();
        });


        webpackCompiler(function (err) {
            if (err) {
                !options.isWatching && done();
                return false;
            }
            if (options.isWatching && runner) {
                watchFiles.forEach(function (file) {
                    delete require.cache[file];
                });
                mocha.suite = mocha.suite.clone();
                mocha.suite.ctx = new Mocha.Context;
                mocha.ui(null);
                runner = null;
            }
            // Run the tests.
            runner = mocha.run(function (mochaErr) {
                if (!options.isWatching) {
                    if (mochaErr) {
                        done(true);
                    } else {
                        done();
                    }
                }

            });
        }, webpackConf);
    });

};