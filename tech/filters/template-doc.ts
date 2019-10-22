import { docUtils } from './doc-utils';
import { Options, Render, Code } from './Documentation';
import * as documentationTemplates from './documentation-templates';

const code: Code = (escaped, escapedPug) => documentationTemplates.code({
  htmlCode: escaped,
  pugCode: escapedPug,
});

const render: Render = (src) => documentationTemplates.templateRender({
  src,
});

export const templateDoc = (str: string, opts: Options): string => {
  const util = docUtils(str, opts.filename);
  return documentationTemplates.template({
    markdown: util.markdown(),
    render: util.render(render),
    code: util.code(code),
  });
};
