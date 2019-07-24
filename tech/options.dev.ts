import { reload } from './filters/reload';
import * as options from './options';

const filters = {...options.filters, ...{reload: reload(true)}};
const optionsDev = {...options, filters};

export = optionsDev;
