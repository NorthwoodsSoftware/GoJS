const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

// Part 1: Build webpack bundle
console.log("Building gcs.js");
try {
  child_process.execSync("tsc");
  child_process.execSync("webpack");
} catch (e) {}

// Part 2: Build d.ts file
console.log("Building gcs.d.ts");
try {
  // Concat all d.ts files in src into one big gcs.d.ts file
  var files = fs.readdirSync(path.join(__dirname, 'src'));
  var dtsFileData = "";
  for (var i in files) {
    var file = files[i];
    if (file.includes(".d.ts")) {
      var fileData = '';
      var lines = fs.readFileSync(path.join(__dirname, 'src',  file), 'utf-8').split('\n');
      for (var j in lines) {
        var line = lines[j];
        if (line.substr(0, 6) !== "import") {
          fileData += line;
        }
      }
      dtsFileData += fileData;
    }
  }
  fs.writeFileSync('./lib/' + 'gcs.d.ts', dtsFileData);
  // Remove all individual d.ts files in src
  for (var i in files) {
    var file = files[i];
    if (file.includes('.d.ts') || file.includes('.js')) {
      fs.unlinkSync(path.join(__dirname, 'src', file));
    }
  }
} catch (e) {console.log(e);}