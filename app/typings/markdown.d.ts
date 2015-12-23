declare module 'markdown' {
  var markdown: IMarkdown;
  export = markdown;
  interface IMarkdown {
    toHTML(input: string): string;
  }
}
