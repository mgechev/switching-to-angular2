import {APP_BASE, APP_DEST, APP_ROOT, APP_SRC, APP_TITLE, SYSTEM_CONFIG, VERSION} from '../config';
import * as fs from 'fs';
import {join, dirname, sep} from 'path';
import * as jsonfile from 'jsonfile';

const CHAPTERS_MAP = {
  ch3: 'Chapter 3',
  ch4: 'Chapter 4',
  ch5: 'Chapter 5',
  ch6: 'Chapter 6',
  ch7: 'Chapter 7',
  ch8: 'Chapter 8'
};

function listMetadataStrategy(data) {
  return `<li><a href="${data.file.replace(APP_SRC + sep, '')}">
    ${data.chapter}, ${data.meta.title}</a>
    ${!data.meta.presented ? '<i style="color: #ccc;">(Not presented in the book\'s content)</i>' : ''}
  </li>`;
}

function readMetadata(current, appRoot) {
  var result = [];
  fs.readdirSync(current).forEach(function (file) {
    if (file === 'meta.json') {
      file = join('.', sep, current, file);
      let currentChapterAbr = file.match(/(ch\d+)/)[0];
      let chapter = CHAPTERS_MAP[currentChapterAbr];
      result.push({
        chapter,
        file: current,
        meta: jsonfile.readFileSync(file)
      });
    } else if (fs.lstatSync(join(current, file)).isDirectory()) {
      result = result.concat(readMetadata(join(current, file), appRoot));
    }
  });
  return result;
}

function getMetadata(appRoot) {
  let metadata = readMetadata(appRoot, appRoot);
  metadata = metadata.sort((a, b) => {
    let chapterA = parseInt(a.chapter.match(/\d+/)[0]);
    let chapterB = parseInt(b.chapter.match(/\d+/)[0]);
    if (chapterA < chapterB) {
      return -1;
    } else if (chapterA > chapterB) {
      return 1;
    }
    if (a.meta.id < b.meta.id) {
      return -1;
    } else {
      return 1;
    }
  });
  let items = metadata.map(listMetadataStrategy);
  return '<ol>' + items.join('\n') + '</ol>';
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
