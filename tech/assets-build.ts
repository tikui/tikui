import { onLibResources } from './lib-resources';

const copy = require('recursive-copy');
import * as path from 'path';
import * as fs from 'fs';
import { project } from './tikui-loader';
import { onDocResources, sassRender } from './doc-resources';
import * as sass from 'sass';

const srcDir: string = path.resolve(project, 'src');
const distDir: string = path.resolve(project, 'dist');

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

const manageSassCopy = (from: string, to: string) => {
  const toDir = path.dirname(to);
  const rendered = sassRender(from);
  fs.mkdirSync(toDir, {recursive: true});
  fs.writeFileSync(to, rendered);
  console.info(`${from} => ${to} using SCSS`);
};

manageCopy(srcDir, distDir, options);

onLibResources((from, to) => manageCopy(from, path.resolve(distDir, to), libOptions));

onDocResources((from, to, type) => {
  const dest = path.resolve(distDir, to);
  switch (type) {
    case 'copy':
      manageCopy(from, dest, libOptions);
      break;
    case 'scss':
      manageSassCopy(from, dest);
      break;
  }
});

