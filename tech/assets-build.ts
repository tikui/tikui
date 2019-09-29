import { onLibResources } from './lib-resources';

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

const libOptions: any = {
  overwrite: true,
};

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

const manageCopy = (...copyargs: any[]) => copy(...copyargs)
  .on(
    copy.events.COPY_FILE_COMPLETE,
    (copyOperation: any) => console.info(`${copyOperation.src} => ${copyOperation.dest}`),
  )
  .on(
    copy.events.ERROR,
    (copyOperation: any) => console.error(`Failing to copy file from ${copyOperation.src} to ${copyOperation.dest}`),
  )
  .catch((err: any) => console.error('Error during copy', err))
;

manageCopy(srcDir, distDir, options);

onLibResources((from, to) => manageCopy(from, path.resolve(distDir, to), libOptions));
