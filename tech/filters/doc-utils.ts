import * as fs from 'fs';
import * as path from 'path';
import * as pug from 'pug';
import * as showdown from 'showdown';
import * as escapeHtml from 'escape-html';

import { DocUtils, Render, TemplateCode } from './Documentation';

const html2pug = require('html2pug');

const projectRoot: string = path.resolve(__dirname, '../..');

const srcDir: string = path.resolve(projectRoot, 'src');

const getCode = (filename: string) => (code: TemplateCode): string => {
  const templateFile = filename.replace(/.md$/, '.template.pug');

  if (!fs.existsSync(templateFile)) {
    return 'Please provide a template file: ' + templateFile;
  }

  const rendered = pug.renderFile(templateFile, {pretty: true, basedir: srcDir});
  const escaped = escapeHtml(rendered).trim();
  const renderedPug = html2pug(rendered, {fragment: true});
  const escapedPug = escapeHtml(renderedPug);

  return code(escaped, escapedPug);
};

const getRender = (filename: string) => (template: Render): string => {
  const absoluteFilename =  path.resolve(filename);
  const renderFilename = absoluteFilename.replace(/.md$/, '.render.pug');
  const relativeRenderFilename = path.relative(srcDir, renderFilename);

  if (!fs.existsSync(renderFilename)) {
    return 'Please provide a render file: ' + renderFilename;
  }

  const htmlFilenameLink = relativeRenderFilename.replace(/^(.+).pug$/, '/$1.html');

  return template(htmlFilenameLink);
};

const getMarkdown = (str: string) => (): string => {
  const converter = new showdown.Converter();

  return converter.makeHtml(str);
};

export const docUtils = (str: string, filename: string): DocUtils => ({
  code: getCode(filename),
  render: getRender(filename),
  markdown: getMarkdown(str),
});
