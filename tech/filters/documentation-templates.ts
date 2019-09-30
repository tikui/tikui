import * as pug from 'pug';
import * as path from 'path';

interface ComponentVariables {
  markdown: string;
  render: string;
  code: string;
}

interface TemplateVariables {
  markdown: string;
  render: string;
  code: string;
}

interface ComponentRenderVariables {
  src: string;
  height: string;
}

interface TemplateRenderVariables {
  src: string;
}

interface CodeVariables {
  htmlCode: string;
  pugCode: string;
}

type Component = (variables: ComponentVariables) => string;
type ComponentRender = (variables: ComponentRenderVariables) => string;
type Template = (variables: TemplateVariables) => string;
type TemplateRender = (variables: TemplateRenderVariables) => string;
type Code = (variables: CodeVariables) => string;

const DOCUMENTATION_DIRECTORY = path.resolve(__dirname, '../../src/documentation');

export const component: Component = pug.compileFile(path.resolve(DOCUMENTATION_DIRECTORY, 'component.pug'));
export const template: Template = pug.compileFile(path.resolve(DOCUMENTATION_DIRECTORY, 'template.pug'));
export const componentRender: ComponentRender = pug.compileFile(path.resolve(DOCUMENTATION_DIRECTORY, 'component-render.pug'));
export const templateRender: TemplateRender = pug.compileFile(path.resolve(DOCUMENTATION_DIRECTORY, 'template-render.pug'));
export const code: Code = pug.compileFile(path.resolve(DOCUMENTATION_DIRECTORY, 'code.pug'));
