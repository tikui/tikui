import * as express from 'express';

const reload = require('reload');
import watch from 'node-watch';
import * as path from 'path';
import * as fs from 'fs';
import * as cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import * as options from './options.dev';
import { onLibResources } from './lib-resources';
import { project } from './tikui-loader';
import { onDocResources, sassRender } from './doc-resources';

const app = express();

const srcDir: string = path.resolve(project, 'src');
const cacheDir: string = path.resolve(project, 'cache');

app.use(cors());

// Set views to sources files
app.set('views', srcDir);

// Create path
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir);
}

// Compiled resources
const renderPage = (res: Response, next: NextFunction) => (filename: string) => {
  const pugUri = filename + '.pug';
  if(fs.existsSync(path.resolve(srcDir, pugUri))) {
    return res.render(pugUri, options);
  }
  return next();
};

app.use(/^\/$/, (req: Request, res: Response, next: NextFunction) => {
  renderPage(res, next)('index');
});

app.use(/^(.+)\/$/, (req: Request, res: Response, next: NextFunction) => {
  const uri = req.baseUrl.replace(/^\/(.+)$/, '$1/index');
  renderPage(res, next)(uri);
});

app.use(/^\/(.+).html$/, (req: Request, res: Response, next: NextFunction) => {
  const uri = req.baseUrl.replace(/^\/(.+).html$/, '$1');
  renderPage(res, next)(uri);
});

app.use(/^\/(.+).css$/, (req: Request, res: Response, next: NextFunction) => {
  const cssUri = req.baseUrl.replace(/^\/(.+).css/, '$1.css');
  const cssCacheUrl = path.resolve(cacheDir, cssUri);
  if (!fs.existsSync(cssCacheUrl)) {
    return next();
  }
  res.set('Content-Type', 'text/css');
  res.send(fs.readFileSync(cssCacheUrl));
});

// Public resources
app.use('/', express.static(srcDir));

onLibResources((absoluteFrom, relativeTo) => app.use(
  path.join('/', relativeTo),
  express.static(absoluteFrom),
));

onDocResources((absoluteFrom, relativeTo, type) => {
  switch (type) {
    case 'copy':
      app.use(
        path.join('/', relativeTo),
        express.static(absoluteFrom),
      );
      break;
    case 'scss':
      app.use(
        path.join('/', relativeTo),
        (req: Request, res: Response) => {
          res.set('Content-Type', 'text/css');
          res.send(sassRender(absoluteFrom));
        }
      );
      break;
  }
});

// Create server
app.listen(3000, () => console.log('Styles are available at http://localhost:3000/'));

// Watch on pug and css files
reload(app).then((reloadReturned: any) => {
  watch([
    srcDir,
    cacheDir
  ], {
    recursive: true
  }, (evt: any, name: any) => {
    if (typeof name === 'string' && !(name.match(/^(.+).scss$/))) {
      reloadReturned.reload();
    }
  });
}).catch((err: any) => {
  console.error('Reload could not start, could not start Tikui app', err);
});
