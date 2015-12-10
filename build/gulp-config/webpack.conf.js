module.exports = function (options) {

    var path = require('path'),
        _ = require('lodash'),
        webpack = require('webpack');

    var srcPath = path.join(process.cwd(), options.assetsPath('src.js')),
        destPath = path.join(options.assetsPath('dist.js')),
        plugins = [];

    plugins.push(
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'PRODUCTION': options.production,
            'process.env': {
                'NODE_ENV': JSON.stringify(options.production ? 'production' : 'development')
            }
        })
    );

    if (options.production) {
        plugins.push(
            new webpack.optimize.OccurenceOrderPlugin(),
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

    return {
        context: srcPath,
        entry: {
            application: ['babel-polyfill', './application.js']
        },
        output: {
            path: path.join(process.cwd(), destPath),
            publicPath: destPath.replace(options.paths.dist.root, '').replace(/\\/g, '/') + '/',
            filename: '[name].js'
        },
        watch: !!options.isWatching,
        devtool: (options.production ? null : '#source-map'),
        debug: (options.production === false),
        plugins: plugins,
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    include: /(node_modules|assets\/vendors)/,
                    loader: 'imports?define=>false'
                }, {
                    test: /\.js$/,
                    exclude: /(node_modules|assets\/vendors)/,
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true
                    }
                }
            ]
        }
    };
};