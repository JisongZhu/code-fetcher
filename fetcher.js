var fs = require('fs');
var path = require('path');
var _str = require('underscore.string');

var extensions = [".ts", ".tsx"]; // ['.js', '.css']
var files = [
    'D:\\projects\\gitlab\\simonli\\web\\src\\components\\SleepVideoView.tsx'
];
var folders = [
    // 'D:\\projects\\gitlab\\simonli\\web\\src\\components\\common',
    'D:\\projects\\gitlab\\simonli\\web\\src\\components\\pages',
    // 'D:\\projects\\gitlab\\simonli\\web-mobile\\src\\components\\pages',
    'D:\\projects\\gitlab\\simonli\\web\\src\\models\\product'
];
var dest = path.join(__dirname, 'result.txt');

var totalCode = '';

function checkExtension(filePath) {
    if (!extensions || extensions.length === 0) {
        return true;
    } else {
        var checked = false;
        for (var n = 0; n < extensions.length; n++) {
            checked = _str.endsWith(filePath, extensions[n]);
            if(checked) break;
        }
        return checked;
    }

    return false;
}

function readFile(filePath) {
    console.log('Begin to read file: ' + filePath);
    console.log('......');
    var code = '';
    if (checkExtension(filePath)) {
        try {
            code = fs.readFileSync(filePath);
        } catch (err1) {
            console.log(err1);
        }
        var convertedCode = '';
        var lines = _str.lines(code);

        for (var i = 0; i < lines.length; i++) {
            if (!_str.isBlank(lines[i])) {
                convertedCode += lines[i] + '\n';
            }
        }
        try {
            fs.appendFileSync(dest, convertedCode);
        } catch (err2) {
            console.log(err2);
        }
        console.log('Finish reading file: ' + filePath);
    } else {
        console.log('Invalid extension.');
    }
    console.log('==========================================');
}

function traverseFolder(folderPath) {
    console.log('Begin to traverse folder: ' + folderPath);
    console.log('......');
    var subfiles = [];
    try {
        subfiles = fs.readdirSync(folderPath);
        for (var m = 0; m < subfiles.length; m++) {
            var subfilePath = path.join(folderPath, subfiles[m]);
            var stats = fs.statSync(subfilePath);
            if (stats.isFile()) {
                readFile(subfilePath);
            } else if (stats.isDirectory()) {
                traverseFolder(subfilePath);
            } else {
                console.log('Failed to read path: ' + subfilePath);
            }
        }
    } catch (err1) {
        console.log(err1);
    }
    console.log('Finish reading folder: ' + folderPath);
    console.log('==========================================');
}



var run = function (){
    console.log("Clear old file...");
    fs.writeFileSync(dest, "");
    for (var j = 0; j < folders.length; j++) {
        traverseFolder(folders[j]);
    }

    for (var k = 0; k < files.length; k++) {
        readFile(files[k]);
    }
    var content = fs.readFileSync(dest);
    var lines = _str.lines(content);
    console.log("Total", lines.length);
}

run();