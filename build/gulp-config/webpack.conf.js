module.exports = function (options) {

    var path = require('path'),
        webpack = require('webpack');

    var cwd = path.join(process.cwd(), options.assetsPath('src.js')),
        destPath = path.join(options.assetsPath('dist.js'));

    return {
        context: cwd,
        entry: {
            application: ['babel-polyfill', './application.js']
        },
        output: {
            path: path.join(process.cwd(), destPath),
            publicPath: destPath.replace(options.paths.dist.root, '').replace(/\\/g, '/') + '/',
            filename: '[name].js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'PRODUCTION': options.production,
                'process.env': {
                    'NODE_ENV': JSON.stringify(options.production ? 'production' : 'development')
                }
            })
        ],
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
                        cacheDirectory: true,
                        presets: [
                            'es2015',
                            'react'
                        ],
                        plugins: [
                            'transform-runtime'
                        ]
                    }
                }
            ]
        }
    };
};