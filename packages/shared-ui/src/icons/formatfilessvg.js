// get and edit files in a dir

// esm
// import path from 'path';
// import fs from 'fs';

// cjs
const path = require('path');
const fs = require('fs');

// joining path of directory
const directoryPath = path.join('../');

// passing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    // filter regex
    const filterFiles = files.filter((file) => file.match(/.*.tsx\b/));
    // listing all files using forEach
    filterFiles.forEach(function (filename) {
        console.log('filename: ', filename);
        // Do whatever you want to do with the file
        updateFile(filename, updateOptions);
    });
});

function updateFile(filename, replacements) {
    return new Promise(function (resolve) {
        fs.readFile(__dirname + '/../' + filename, 'utf-8', function (err, data) {
            var regex, replaceStr;
            if (err) {
                throw err;
            } else {
                console.log('formatting files...');
                replacements.forEach((r, i) => {
                    regex = new RegExp(r.rule);
                    // equals 'let = "match"'
                    // '(\\' + 'let' + '\\s* ]*' + replacements[0].rule + '\\s*=\\s*)([^\\n;}]+)([\\s*;}])'
                    replaceStr = r.replacer;
                    data = data.replace(regex, replaceStr);
                });
            }
            fs.writeFile(filename, data, 'utf-8', function (err) {
                if (err) {
                    throw err;
                } else {
                    resolve();
                }
            });
        });
    });
}

const updateOptions = [
    { rule: '^.', replacer: "import { SVGAttributes } from 'react';" },
    { rule: '(props)', replacer: 'props: SVGAttribute' },
    {
        rule: `svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={width}
                    height={height}
                    className={className}
                    fill={color}
                    version="1.1"
                    viewBox=`,
        replacer: 'svg viewBox=',
    },
    { rule: 'xmlSpace="preserve"', replacer: '{...props}' },
];
