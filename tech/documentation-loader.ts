import * as path from 'path';
import { config } from './tikui-loader';

export const pluginPath = () => path.dirname(require.resolve(path.join(`tikuidoc-${config.documentation}`, 'package.json')));
