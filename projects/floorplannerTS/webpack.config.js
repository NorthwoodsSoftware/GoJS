var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        "gfp": './src/floorplannerFiles', // webpack floorplanner bundle
    },
    target: 'web',
    devtool: "source-map",
    resolve: {
        extensions: [".tsx", ".js", ".ts"]
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'gfp.js',
        libraryTarget: 'window',
        library: 'gfp'
    },
    externals:[
        {
            '../../../release/go': 'go'
        }
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            }
        ]
    },
    plugins: [
        ////new UglifyJSPlugin({ sourceMap: true })
    ]
};