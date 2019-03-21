const docUtils = require('./doc-utils');

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
`;
};
