/**
 * JavaScript Related Task
 * ===============================
 */


function compilerTask(gulp, $, options) {

    var _ = require('lodash'),
        webpack = require('webpack');

    var webpackConfig = require('../gulp-config/webpack.conf')(options);

    return function _compilerTask(callback, opts) {

        var callingDone = false,
            config = _.defaults(opts || {}, webpackConfig);


        if (options.isWatching) {
            config.watch = true;
        }

        if (!options.production) {
            if (config.debug === undefined) {
                config.devtool = '#source-map';
                config.debug = true;
            }
        } else {
            config.plugins.push(
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.UglifyJsPlugin({
                    sourceMap: false,
                    compressor: {
                        screw_ie8: true,
                        warnings: false
                    }
                }),
                new webpack.BannerPlugin(
                    _.template(options.banners.application)(options),
                    {entryOnly: true, raw: true}
                )
            );
        }

        webpack(config, function (err, stats) {

            if (callingDone) {
                return;
            }
            // Debounce output a little for when in watch mode
            if (options.isWatching) {
                callingDone = true;
                setTimeout(function () {
                    callingDone = false;
                }, 1000);
            }

            $.util.log((stats || {}).toString({
                colors: $.util.colors.supportsColor,
                hash: false,
                timings: false,
                chunks: false,
                chunkModules: false,
                modules: false,
                children: true,
                version: true,
                cached: false,
                cachedAssets: false,
                reasons: false,
                source: false,
                errorDetails: false
            }));

            if (err) {
                throw new $.util.PluginError('webpack', err);
            }

            if (typeof callback === 'function') {
                if (stats && stats.hasErrors()) {
                    callback(true);
                } else {
                    callback();
                }
            }
        });
    };
}

module.exports = function (gulp, $, options) {

    var webpackCompiler = compilerTask(gulp, $, options);

    gulp.task('scripts', function (done) {
        webpackCompiler(done);
    });

    gulp.task('scripts:watch', function (done) {

        var notifier = $.notify({message: 'Scripts Compiled'}),
            browserSync = require('browser-sync').get(options.buildHash);

        notifier.on('error', $.notify.onError({
            message: 'Error: <%= error.message %>'
        }));

        //force watching
        if (!options.isWatching) {
            options.isWatching = true;
        }

        webpackCompiler(function (err) {
            if (err) {
                notifier.emit('error', new Error('Compilation error!'));
            } else {
                notifier.write('Scripts Compiled');
                browserSync.reload();
            }

        });
    });
};


module.exports.compilerTask = compilerTask;