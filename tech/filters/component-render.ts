import { docUtils } from './doc-utils';
import { Options, Render } from './Documentation';

const render = (height: string): Render => (src) => `<iframe class="doc-iframe" src="${src}" height="${height}"></iframe>`;

export const componentRender = (str: string, opts: Options): string => {
  const util = docUtils(str, opts.filename);
  const height = opts.height ||  '150';
  return `<div class="markdown">${util.markdown()}</div>
<div class="render">${util.render(render(height))}</div>
`;
};
