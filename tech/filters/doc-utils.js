const pug = require('pug');
const escapeHtml = require('escape-html');
const html2pug = require('html2pug');
const showdown = require('showdown');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '../..');

const srcDir = path.resolve(projectRoot, 'src');

/**
 * Code parsing
 * @param {string} filename
 * @returns {function(function(string, string): string): string}
 */
const getCode = (filename) => (template) => {
  const templateFile = filename.replace(/.md$/, '.template.pug');

  if (!fs.existsSync(templateFile)) {
    return 'Please provide a template file: ' + templateFile;
  }

  const rendered = pug.renderFile(templateFile, {pretty: true, basedir: srcDir}, null);
  const escaped = escapeHtml(rendered).trim();
  const renderedPug = html2pug(rendered, {fragment: true});
  const escapedPug = escapeHtml(renderedPug);

  return template(escaped, escapedPug);
};

/**
 * Rendering
 * @param {string} filename
 * @returns {function(function(string): string): string}
 */
const getRender = (filename) => (template) => {
  const absoluteFilename =  path.resolve(filename);
  const renderFilename = absoluteFilename.replace(/.md$/, '.render.pug');
  const relativeRenderFilename = path.relative(srcDir, renderFilename);

  if (!fs.existsSync(renderFilename)) {
    return 'Please provide a render file: ' + renderFilename;
  }

  const htmlFilenameLink = relativeRenderFilename.replace(/^(.+).pug$/, '/$1.html');

  return template(htmlFilenameLink);
};

/**
 * Markdown parsing
 * @param {string} str
 * @returns {function(): string}
 */
const getMarkdown = (str) => () => {
  const converter = new showdown.Converter();

  return converter.makeHtml(str);
};

/**
 * Doc utils module
 * @param {string} str
 * @param {string} filename
 * @return {{code: (function(function(string, string): string): string), render: (function(function(string): string): string), markdown: (function(): string)}}
 */
module.exports = (str, filename) => ({
  code: getCode(filename),
  render: getRender(filename),
  markdown: getMarkdown(str),
});
