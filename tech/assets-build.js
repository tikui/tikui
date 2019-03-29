const copy = require('recursive-copy');
const path = require('path');
const fs = require('fs');

const projectRoot = path.resolve(__dirname, '..');

const srcDir = path.resolve(projectRoot, 'src');
const distDir = path.resolve(projectRoot, 'dist');

const options = {
    overwrite: true,
    expand: true,
    dot: true,
    junk: true,
    filter: [
        '**/*',
        '!**/*.scss',
        '!**/*.pug'
    ],
};

if(!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

copy(srcDir, distDir, options);
