export * from './utils/template_injectables';
export * from './utils/template_locals';
export * from './utils/server';
export * from './utils/tasks_tools';
import * as path from 'path';
import {APP_DEST} from './config';

export function relativePath(fileLocation) {
  fileLocation = path.dirname(fileLocation);
  var parentDir = __dirname.replace(path.join('tools'), '');
  var result = path.join(path.sep, fileLocation.replace(path.join(parentDir, 'app'), APP_DEST), path.sep);
  return result;
}

export function tsProjectFn(plugins) {
  const tsconfig = __dirname + '/../app/tsconfig.json';
  return plugins.typescript.createProject(tsconfig, {
    typescript: require('typescript')
  });
}
