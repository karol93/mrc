const webpack = require("webpack");
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: path.join(__dirname, 'src/chrome-extension/index.ts'),
        background: path.join(__dirname, 'src/chrome-extension/background.ts'),
        content_script: path.join(__dirname, 'src/chrome-extension/content_script.ts'),
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
        new CopyWebpackPlugin([
            {from: 'src/manifest.json', to: "../"},
            {from: 'src/chrome-extension/index.html', to: "../"},
            {from: 'src/chrome-extension/styles.css', to: "../"}
        ]),

        // minify
        // new webpack.optimize.UglifyJsPlugin()
    ]
};
