const copy = require('recursive-copy');
import * as path from 'path';
import * as fs from 'fs';

const projectRoot: string = path.resolve(__dirname, '..');

const srcDir: string = path.resolve(projectRoot, 'src');
const distDir: string = path.resolve(projectRoot, 'dist');

const options: any = {
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
