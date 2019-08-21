import * as express from 'express';
const reload = require('reload');
import watch from 'node-watch';
import * as path from 'path';
import * as fs from 'fs';
import * as cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import * as options from './options.dev';

const app = express();

const projectRoot: string = path.resolve(__dirname, '..');

const srcDir: string = path.resolve(projectRoot, 'src');
const cacheDir: string = path.resolve(projectRoot, 'cache');

app.use(cors());

// Set views to sources files
app.set('views', srcDir);

// Create path
if(!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
}

// Compiled resources
app.use(/^\/$/, (req: Request, res: Response) => {
    res.render('index.pug', options);
});

app.use(/^(.+)\/$/, (req: Request, res: Response) => {
    const pugUri = req.baseUrl.replace(/^\/(.+)$/, '$1/index.pug');
    res.render(pugUri, options);
});

app.use(/^\/(.+).html$/, (req: Request, res: Response) => {
    const pugUri = req.baseUrl.replace(/^\/(.+).html$/, '$1.pug');
    res.render(pugUri, options);
});

app.use(/^\/(.+).css$/, (req: Request, res: Response, next: NextFunction) => {
    const cssUri = req.baseUrl.replace(/^\/(.+).css/, '$1.css');
    const cssCacheUrl = path.resolve(cacheDir, cssUri);
    if(!fs.existsSync(cssCacheUrl)) {
        return next();
    }
    res.set('Content-Type', 'text/css');
    res.send(fs.readFileSync(cssCacheUrl));
});

// Public resources
app.use('/', express.static(srcDir));


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
