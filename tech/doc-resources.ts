import * as path from 'path';
import { pluginPath } from './documentation-loader';
import * as fs from 'fs';
import * as sass from 'sass';
import { project } from './tikui-loader';

type ResourceType = 'copy' | 'scss';

interface DocResource {
  from: string
  type: ResourceType,
  to: string,
}

interface DocResources {
  public: DocResource[];
}

const tikuidocPath = path.resolve(pluginPath(), 'tikuidoc.json');

const toDocResource = (json: any): DocResource => ({
  from: json.from,
  type: json.type || 'copy',
  to: json.to,
});

const toDocResourceList = (json: any): DocResource[] => Array.isArray(json) ? json.map(toDocResource) : [];

const toDocResources = (json: any): DocResources => ({
  public: toDocResourceList(json.public) || [],
});

export const docResources: DocResources = fs.existsSync(tikuidocPath) ? toDocResources(require(tikuidocPath)) : toDocResources({});

export const onDocResources = (launch: (absoluteFrom: string, relativeTo: string, type: ResourceType) => void) => docResources.public
  .forEach(filename => launch(
    path.resolve(pluginPath(), 'src', filename.from),
    filename.to,
    filename.type,
  ));

export const sassRender = (file: string): Buffer => {
  const rendered = sass.renderSync({
    file: file,
    includePaths: [
      path.resolve(project, 'node_modules')
    ]
  });
  return rendered.css;
};
