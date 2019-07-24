import * as path from 'path';

import { componentDoc } from './filters/component-doc';
import { componentRender } from './filters/component-render';
import { templateDoc } from './filters/template-doc';
import { reload } from './filters/reload';

const options = {
    basedir: path.resolve(__dirname, '../src'),
    filters: {
        componentDoc,
        componentRender,
        templateDoc,
        reload: reload(false)
    }
};

export = options;
