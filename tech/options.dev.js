const optionsDev = require('./options');
optionsDev.filters.reload = require('./filters/reload')(true);
module.exports = optionsDev;
