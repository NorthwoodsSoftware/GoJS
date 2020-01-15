const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

// Part 1: Build webpack bundle
console.log("Building gfp.js");
try {
  console.log("Compiling typescript...");
  child_process.execSync("tsc");
  console.log("Running webpack...");
  child_process.execSync("webpack");
} catch (e) {
  console.log(e);
}


// Part 2: Build d.ts file
console.log("Building gfp.d.ts");
try {
  // Concat all d.ts files in src into one big gcs.d.ts file
  var files = fs.readdirSync(path.join(__dirname, 'src'));
  var dtsFileData = "";
  for (var i in files) {
    var file = files[i];
    if (file.includes(".d.ts")) {
      var fileData = '';
      var lines = fs.readFileSync(path.join(__dirname, 'src', file), 'utf-8').split('\n');
      for (var j in lines) {
        var line = lines[j];
        if (line.substr(0, 6) !== "import") {
          fileData += line;
        }
      }
      dtsFileData += fileData;
    }
  }
  fs.writeFileSync('./lib/' + 'gfp.d.ts', dtsFileData);
  // Remove all individual d.ts files in src
  for (var i in files) {
    var file = files[i];
    if (file.includes('.d.ts') || file.includes('.js')) {
      fs.unlinkSync(path.join(__dirname, 'src', file));
    }
  }
} catch (e) { console.log(e); }
