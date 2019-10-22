export type Code = (escaped: string, escapedPug: string) => string;
export type Render = (src: string) => string;
export type Markdown = () => string;

export interface Options {
  filename: string;
  height: string;
}

export interface DocUtils {
  code: (code: Code) => string;
  render: (render: Render) => string;
  markdown: Markdown;
}
