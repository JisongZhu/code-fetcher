var fs = require('fs');
var path = require('path');
var _str = require('underscore.string');

/**
 * 后缀过滤。只拉取数组中列举的后缀文件。
 */
var extensions = [".ts", ".tsx"]; // ['.js', '.css']
/**
 * 源文件的路径数组。
 */
var files = [
    'D:\\projects\\gitlab\\simonli\\web\\src\\components\\SleepVideoView.tsx'
];
/**
 * 源代码文件目录。当某一个目录里面的文件都需要拉取出来时，可以将目录的地址加到数组中，而不需要一个一个地把文件路径添加到files数组。
 */
var folders = [
    // 'D:\\projects\\gitlab\\simonli\\web\\src\\components\\common',
    'D:\\projects\\gitlab\\simonli\\web\\src\\components\\pages',
    // 'D:\\projects\\gitlab\\simonli\\web-mobile\\src\\components\\pages',
    'D:\\projects\\gitlab\\simonli\\web\\src\\models\\product'
];
/**
 * 合并后的源码文件路径。
 */
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