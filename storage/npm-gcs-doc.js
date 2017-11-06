const child_process = require('child_process');
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const mkdirp = require('mkdirp');
const path = require('path');
const rimraf = require('rimraf');
const TYPEDOC_CMD = path.join('..', 'buildTS', 'typedoc', 'bin', 'typedoc');
const dts = require('dts-bundle');
/*
console.log("Generating API Documentation:");

// Part 1: Clean existing documentation
console.log("Removing existing docs...");
rimraf.sync('./gcs-doc');


// Part 2: Build the custom theme
console.log("Building custom theme...");
try {
  if (!fs.existsSync('../buildTS/typedoc-default-themes/node_modules')) {
    child_process.execSync("npm install", { cwd: "../buildTS/typedoc-default-themes", stdio: [0,1,2] });
  } else {
    child_process.execSync("npm run prepublish", { cwd: "../buildTS/typedoc-default-themes", stdio: [0,1,2] });
  }
} catch (e) {}

// Part 3: Run typedoc
console.log("Executing typedoc command...");
try {
  if (!fs.existsSync('../buildTS/typedoc/dist')) {
    child_process.execSync("npm install", { cwd: "../buildTS/typedoc", stdio: [0,1,2] });
  }
  child_process.execSync('node ' +
    TYPEDOC_CMD + ' --options typedoc.json' +
        ' --tsconfig tsconfig.typedoc.json',
    { stdio: [0,1,2] }
  );
} catch (e) {}*/

// Part 4: Build webpack bundle
console.log("Building gcs.js");
try {
  child_process.execSync("tsc");
  child_process.execSync("webpack");
} catch (e) {}

console.log("Building gcs.d.ts");
try {
  // Concat all d.ts files in src into one big gcs.d.ts file
  var files = fs.readdirSync(__dirname + '/src');
  var dtsFileData = "";
  for (var i in files) {
    var file = files[i];
    if (file.includes(".d.ts")) {
      var fileData = '';
      var lines = fs.readFileSync(__dirname + '/src/' + file, 'utf-8').split('\n');
      for (var j in lines) {
        var line = lines[j];
        if (line.substr(0, 6) !== "import") {
          fileData += line;
        }
      }
      dtsFileData += fileData;
    }
  }
  fs.writeFileSync(__dirname + '/lib/' + 'gcs.d.ts', dtsFileData);
  // Remove all individual d.ts files in src
  for (var i in files) {
    var file = files[i];
    if (file.includes('.d.ts') || file.includes('.js')) {
      fs.unlink(__dirname + '/src/' + file);
    }
  }
} catch (e) {console.log(e);}