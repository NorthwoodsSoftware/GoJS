var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//var DtsBundlerPlugin = require('dtsbundler-webpack-plugin');
const DtsPlugin = require('dts-webpack-plugin');

module.exports = {
    entry: {
        "gcs": './src/goCloudStorageFiles', // go cloud storage bundle
    },
    target: 'web',
    devtool: "source-map",
    resolve: {
        extensions: [".tsx", ".js", ".ts"]
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'gcs.js',
        libraryTarget: 'var',
        library: 'gcs'
    },
    externals:[
        {
            '../../release/go': 'go'
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
        //new UglifyJSPlugin({
            //include: /\/gcs-src.min.js/
            //test: /\.min$/
        //})
    ]
};