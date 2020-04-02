var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        "gcs": './src/goCloudStorageFiles', // go cloud storage bundle
    },
    target: 'web',
    // devtool: "source-map",
    resolve: {
        extensions: [".tsx", ".js", ".ts"]
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'gcs.js',
        libraryTarget: 'var',
        library: 'gcs'
    },
    optimization: {
        minimize: false
    },
    externals: [
        {
            'gojs': 'go'
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
        new webpack.BannerPlugin("Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.")
        ////new UglifyJSPlugin({ sourceMap: true })
    ]
};