const docUtils = require('./doc-utils');

/**
 * Code template
 * @param {string} escaped
 * @param {string} escapedPug
 * @returns {string}
 */
const code = (escaped, escapedPug) => `<div class="row">
    <div class="col-12 col-lg-6">
        <pre><code class="language-html">${escaped}</code></pre>
    </div>
    <div class="col-12 col-lg-6">
        <pre><code class="language-pug">${escapedPug}</code></pre>
    </div>
</div>
`;

/**
 * Render
 * @param {string} src
 * @return {string}
 */
const render = (src) => `<a class="btn btn-primary doc-template" href="${src}" target="_blank">Show</a>`;

module.exports = (str, opts) => {
    const util = docUtils(str, opts.filename);
    return `<div class="markdown">${util.markdown()}</div>
<div class="render">${util.render(render)}</div>
<div class="code">${util.code(code)}</div>
`;
};
