var browserify = require('browserify');
var tsify = require('tsify');
var uglifyify = require('uglifyify');
var fs = require('fs');
var replace = require('stream-replace');

browserify()
    .add('minimal.ts')
    .plugin(tsify, { noImplicitAny: true })
    .transform(uglifyify, { global: true  })
    .bundle()
    .on('error', function (error) { console.error(error.toString()); })
    .pipe(replace(/\.\.\/\.\.\/srcTS\//g, '')) // cleanup
    .pipe(fs.createWriteStream('minimal.js'));