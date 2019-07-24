import { docUtils } from './doc-utils';
import { Options, Render, TemplateCode } from './Documentation';

const code: TemplateCode = (escaped, escapedPug) => `<div class="row">
    <div class="col-12 col-lg-6">
        <pre><code class="language-html">${escaped}</code></pre>
    </div>
    <div class="col-12 col-lg-6">
        <pre><code class="language-pug">${escapedPug}</code></pre>
    </div>
</div>
`;

const render: Render = (src) => `<a class="btn btn-primary doc-template" href="${src}" target="_blank">Show</a>`;

export const templateDoc = (str: string, opts: Options): string => {
    const util = docUtils(str, opts.filename);
    return `<div class="markdown">${util.markdown()}</div>
<div class="render">${util.render(render)}</div>
<div class="code">${util.code(code)}</div>
`;
};
