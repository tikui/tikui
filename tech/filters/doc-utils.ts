import * as fs from 'fs';
import * as path from 'path';
import * as pug from 'pug';
import * as showdown from 'showdown';
import * as escapeHtml from 'escape-html';

import { DocUtils, Render, Code } from './Documentation';
import { project } from '../tikui-loader';

const html2pug = require('html2pug');

const srcDir: string = path.resolve(project, 'src');

const getCode = (filename: string) => (code: Code): string => {
  const codeFile = filename.replace(/.md$/, '.code.pug');

  if (!fs.existsSync(codeFile)) {
    return 'Please provide a code file: ' + codeFile;
  }

  const rendered = pug.renderFile(codeFile, {pretty: true, basedir: srcDir});
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
