code-fetcher
============

Fetch the contents of specified files and folders into a text file

Now, it just works with text files.

## Usage

Config the variable "files" and "folders" with full paths.
For exsample:

```
var files = [
    '/home/zjs/project/solution-antique/manager/src/app.js'
];
var folders = [
    '/home/zjs/project/solution-antique/client/src/x3ui/js',
    '/home/zjs/project/solution-antique/client/src/viewer/js',
    '/home/zjs/project/solution-antique/manager/src/lib',
    '/home/zjs/project/solution-antique/manager/src/static/js'
];
```

The variable "extensions" is optional. If you want to limit file type, do it like this: 

```
var extensions = ['.js', '.css', ...];
```

## Run

```
cd [path of code-fetch]
npm i
node fetcher.js
```