const express = require('express');
const cors = require('cors')
const app = express();
const reload = require('reload');
const watch = require('node-watch');
const fs = require('fs');
const path = require('path');
const options = require('./options.dev');

const projectRoot = path.resolve(__dirname, '..');

const srcDir = path.resolve(projectRoot, 'src');
const cacheDir = path.resolve(projectRoot, 'cache');

app.use(cors());

// Set views to sources files
app.set('views', srcDir);

// Create path
if(!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
}

// Compiled resources
app.use(/^\/$/, (req, res) => {
    res.render('index.pug', options);
});

app.use(/^(.+)\/$/, (req, res) => {
    const pugUri = req.baseUrl.replace(/^\/(.+)$/, '$1/index.pug');
    res.render(pugUri, options);
});

app.use(/^\/(.+).html$/, (req, res) => {
    const pugUri = req.baseUrl.replace(/^\/(.+).html$/, '$1.pug');
    res.render(pugUri, options);
});

app.use(/^\/(.+).css$/, (req, res, next) => {
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
reload(app).then(function (reloadReturned) {
    watch([
        srcDir,
        cacheDir
    ], {
        recursive: true
    }, (evt, name) => {
        if (typeof name === 'string' && !(name.match(/^(.+).scss$/))) {
            reloadReturned.reload();
        }
    });
}).catch(function (err) {
    console.error('Reload could not start, could not start Tikui app', err);
});
