const webpack = require("webpack");
const path = require('path');

module.exports = {
    entry: {
        index: path.join(__dirname, 'src/index.ts'),
        background: path.join(__dirname, 'src/background.ts'),
        content_script: path.join(__dirname, 'src/content_script.ts'),
        vendor: ['jquery', 'babel-polyfill'],    
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: "[name].js",
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            exclude: /node_modules/,
            test: /\.tsx?$/,
            loader: 'babel-loader?presets[]=env!ts-loader'
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [

        new webpack.optimize.CommonsChunkPlugin({
            names: ['common','vendor'],
            minChunks: 2
        }),


        // minify
        // new webpack.optimize.UglifyJsPlugin()
    ]
};
