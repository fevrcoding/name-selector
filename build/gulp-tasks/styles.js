/**
 * Sass and Stylesheets Related Task
 * ===============================
 */

module.exports = function (gulp, $, options) {

        var path = require('path'),
            autoprefixer = require('autoprefixer'),
            lazypipe = require('lazypipe'),
        reloadStream,
            production = options.production,
            paths = options.paths,
            destPath = options.assetsPath('dist.css'),
            sassFunctions = require('./lib/sass-functions')(options),
            postLegacyPipe,
            postPipe,
            productionPipe;

    function reloadStreamFn() {
        if (options.isWatching && options.livereload) {
            return reloadStream || (reloadStream = require('browser-sync').get(options.buildHash).stream);
        }
        return $.util.noop;
    }


        if (production) {
            destPath = path.normalize(destPath.replace(paths.dist.root, paths.tmp));
        }

        postLegacyPipe = lazypipe()
            .pipe($.postcss, [
                autoprefixer({ browsers: ['ie 8'] }),
                require('postcss-pseudoelements')(),
                require('postcss-color-rgba-fallback')()
            ]);

        postPipe = lazypipe()
            .pipe($.postcss, [
                autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'ie 9'] })
            ]);


    if (production) {
        productionPipe = lazypipe()
            .pipe($.header, options.banners.application, {pkg: options.pkg})
            .pipe(function () {
                return gulp.dest(destPath);
            })
            .pipe(function () {
                return $.if(/\-ie\.css$/, $.minifyCss({compatibility: 'ie8'}), $.minifyCss());
            })
            .pipe($.rename, {suffix: '.min'});
    } else {
        productionPipe = $.util.noop;
    }




    gulp.task('styles', function () {

        // For best performance, don't add Sass partials to `gulp.src`
        return gulp.src([
                options.assetsPath('src.sass', '**/*.{sass,scss}'),
                '!' + options.assetsPath('src.sass', '**/*scsslint_tmp*.{sass,scss}') //exclude scss lint files
            ])
            .pipe($.plumber({
                errorHandler: $.notify.onError('Error: <%= error.message %>')
            }))
            .pipe($.sourcemaps.init())
            .pipe($.sass({
                precision: 10,
                includePaths: [options.assetsPath('src.vendors')],
                outputStyle: 'expanded',
                functions: sassFunctions
            }).on('error', $.sass.logError))
            .pipe($.if(/\-ie\.css$/, postLegacyPipe(), postPipe()))
            .pipe($.if(production, productionPipe()))
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(options.assetsPath('dist.css')))
            .pipe(reloadStreamFn()({match: '**/*.css'}))
            .pipe($.if(options.isWatching, $.notify({ message: 'SASS Compiled', onLast: true })))
            .pipe($.size({title: 'styles'}));
    });

};