import {APP_BASE, APP_DEST, APP_ROOT, APP_SRC, APP_TITLE, SYSTEM_CONFIG, VERSION} from '../config';
import * as fs from 'fs';
import {join, dirname, sep} from 'path';
import * as jsonfile from 'jsonfile';

function listMetadataStrategy(meta, path, appRoot) {
  return '<li><a href="' + path.replace(APP_SRC + sep, '') + '">' + meta.title + '</a></li>'
}

function readMetadata(current, formatStrategy, appRoot) {
  var result = [];
  fs.readdirSync(current).forEach(function (file) {
    if (file === 'meta.json') {
      file = join('.', sep, current, file);
      result.push(formatStrategy(jsonfile.readFileSync(file), current, appRoot));
    } else if (fs.lstatSync(join(current, file)).isDirectory()) {
      result = result.concat(readMetadata(join(current, file), formatStrategy, appRoot));
    }
  });
  return result;
}

function getMetadata(appRoot) {
  return '<ol>' + readMetadata(appRoot, listMetadataStrategy, appRoot).join('\n') + '</ol>';
}

function transformPath(plugins, env) {
  return function (filepath) {
    var filename = filepath.replace(sep + APP_DEST, '');
    arguments[0] = join(APP_BASE, filename);
    return plugins.inject.transform.apply(plugins.inject.transform, arguments);
  };
}

function relativePath(fileLocation) {
  fileLocation = dirname(fileLocation);
  var parentDir = __dirname.replace(join('tools'), '');
  var result = join(sep, fileLocation.replace(join(parentDir, 'app'), ''), sep);
  return result;
}

// TODO: Add an interface to register more template locals.
export function templateLocals() {
  return {
    APP_BASE,
    APP_DEST,
    APP_ROOT,
    APP_TITLE,
    SYSTEM_CONFIG,
    VERSION,
    EXAMPLES_LIST: getMetadata(join(APP_SRC))
  };
}
