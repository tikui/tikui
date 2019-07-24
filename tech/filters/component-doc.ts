import { docUtils } from './doc-utils';
import { Options, Render, TemplateCode } from './Documentation';

const templateCode: TemplateCode = (escaped, escapedPug): string => `<div class="row">
    <div class="col-12 col-lg-6">
        <pre><code class="language-html">${escaped}</code></pre>
    </div>
    <div class="col-12 col-lg-6">
        <pre><code class="language-pug">${escapedPug}</code></pre>
    </div>
</div>
`;

const render = (height: string): Render  => (src) => `<iframe class="doc-iframe" src="${src}" height="${height}"></iframe>`;

export const componentDoc = (str: string, opts: Options): string => {
  const util = docUtils(str, opts.filename);
  const height = opts.height || '150';
  return `<div class="markdown">${util.markdown()}</div>
<div class="render">${util.render(render(height))}</div>
<div class="code">${util.code(templateCode)}</div>
`;
};
