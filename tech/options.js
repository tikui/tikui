const path = require('path');
module.exports = {
    basedir: path.resolve(__dirname, '../src'),
    filters: {
        componentDoc: require('./filters/component-doc'),
        componentRender: require('./filters/component-render'),
        templateDoc: require('./filters/template-doc'),
        reload: require('./filters/reload')(false)
    }
};
