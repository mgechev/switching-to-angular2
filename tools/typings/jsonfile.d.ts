declare module 'jsonfile' {
  let jsonfile: IJsonfile;
  interface IJsonfile {
    readFileSync(filename: string): string;
  }
  export = jsonfile;
}