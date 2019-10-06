import * as path from 'path';

export const project = process.cwd();

export const config = require(path.resolve(project, 'tikuiconfig.json'));
