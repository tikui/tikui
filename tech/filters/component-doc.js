const docUtils = require('./doc-utils');

/**
 * Code template
 * @param {string} escaped
 * @param {string} escapedPug
 * @returns {string}
 */
const templateCode = (escaped, escapedPug) => `<div class="row">
    <div class="col-12 col-lg-6">
        <pre><code class="language-html">${escaped}</code></pre>
    </div>
    <div class="col-12 col-lg-6">
        <pre><code class="language-pug">${escapedPug}</code></pre>
    </div>
</div>
`;

/**
 * Renderer
 * @param {string} height
 * @return {function(string): string}
 */
const render = (height) => (src) => `<iframe class="doc-iframe" src="${src}" height="${height}"></iframe>`;

module.exports = (str, opts) => {
    const util = docUtils(str, opts.filename);
    const height = opts.height ||  150;
    return `<div class="markdown">${util.markdown()}</div>
<div class="render">${util.render(render(height))}</div>
<div class="code">${util.code(templateCode)}</div>
`;
};
