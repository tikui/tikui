import * as path from 'path';

import { componentDoc } from './filters/component-doc';
import { templateDoc } from './filters/template-doc';
import { reload } from './filters/reload';
import { pluginPath } from './documentation-loader';
import { project } from './tikui-loader';

const MultipleBasedirsPlugin = require("pug-multiple-basedirs-plugin");

const options = {
    basedir: path.resolve(project, 'src'),
    plugins: [
      MultipleBasedirsPlugin({
        paths: [
          path.resolve(
            pluginPath(),
            'src',
          ),
          path.resolve(project, 'src'),
        ],
      }),
    ],
    filters: {
        componentDoc,
        templateDoc,
        reload: reload(false)
    }
};

export = options;
