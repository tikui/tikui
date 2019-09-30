import { docUtils } from './doc-utils';
import { Options, Render, TemplateCode } from './Documentation';
import * as documentationTemplates from './documentation-templates';

const templateCode: TemplateCode = (escaped, escapedPug): string => documentationTemplates.code({
  htmlCode: escaped,
  pugCode: escapedPug,
});

const render = (height: string): Render => (src) => documentationTemplates.componentRender({
  src,
  height,
});

export const componentDoc = (str: string, opts: Options): string => {
  const util = docUtils(str, opts.filename);
  const height = opts.height || '150';
  return documentationTemplates.component({
    markdown: util.markdown(),
    render: util.render(render(height)),
    code: util.code(templateCode),
  });
};
