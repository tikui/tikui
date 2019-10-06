import * as path from 'path';

interface LibResource {
  to: string,
  from: string
}

interface LibResources {
  [module: string]: LibResource[];
}

export const libResources: LibResources = {
  'prismjs': [
    {
      from: 'prism.js',
      to: 'prism.js',
    },
    {
      from: 'components/prism-pug.min.js',
      to: 'prism-pug.js',
    },
    {
      from: 'themes/prism.css',
      to: 'prism.css',
    },
  ],
};


const resolveNodeDir = (name: string): string => path.dirname(require.resolve(path.join(name, 'package.json')));

export const onLibResources = (launch: (absoluteFrom: string, relativeTo: string) => void) => Object
  .entries(libResources)
  .forEach(([name, files]) => files
    .forEach(filename => launch(
      path.resolve(resolveNodeDir(name), filename.from),
      path.join('lib', name, filename.to),
    )));
