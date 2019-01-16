const path = require('path');
const ClosureCompilerPlugin = require('webpack-closure-compiler');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './minimal.ts'),
  output: {
    path: path.resolve(__dirname, './'),
    library: 'minimal.js',
    libraryTarget: 'umd',
    filename: 'minimal.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      // files with `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  stats: 'errors-only',
  plugins: [
    new ClosureCompilerPlugin({
      compiler: {
        language_out: 'ECMASCRIPT5',
        process_common_js_modules: true,
      }
    })
  ]
}
