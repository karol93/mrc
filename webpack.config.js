const webpack = require("webpack");
const path = require('path');

module.exports = {
    entry: {
        vendor: ['jquery', 'babel-polyfill'],
        utils: path.join(__dirname, 'src/utils.ts'),
        filters: path.join(__dirname, 'src/filters.ts'),
        index: path.join(__dirname, 'src/index.ts'),
        background: path.join(__dirname, 'src/background.ts'),
        content_script: path.join(__dirname, 'src/content_script.ts'),
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            test: /\.tsx?$/,
            loader: 'babel-loader?presets[]=es2015!ts-loader'
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [

        // pack common vender files
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'utils','filters'],
            minChunks: Infinity
        })
      

        // minify
        // new webpack.optimize.UglifyJsPlugin()
    ]
};
