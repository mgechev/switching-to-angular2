"use strict";

var fs = require('fs');
var CONFIG = require('./workflow.config');
var PATH = CONFIG.PATH;
var path = require('path');
var join = path.join;
var slash = require('slash');

//serveSpa
var resolve = path.resolve;
var connectLivereload = require('connect-livereload');
var serveStatic = require('serve-static');
var openResource = require('open');
var express = require('express');
var minilr = require('mini-lr')();

var jsonfile = require('jsonfile');

// --------------
// Utils.

function notifyLiveReload(e) {
  var fileName = e.path;
  minilr.changed({
    body: {
      files: [fileName]
    }
  });
}

function listMetadataStrategy(meta, path, appRoot) {
  return '<li><a href="' + path.replace(new RegExp('^' + appRoot), '') + '">' + meta.title + '</a></li>'
}

function readMetadata(current, formatStrategy, appRoot) {
  var result = [];
  fs.readdirSync(current).forEach(function (file) {
    if (file === 'meta.json') {
      file = join('./', current, file);
      file = result.push(formatStrategy(jsonfile.readFileSync(file), current, appRoot));
    } else if (fs.lstatSync(join(current, file)).isDirectory()) {
      result = result.concat(readMetadata(join(current, file), formatStrategy, appRoot));
    }
  });
  return result;
}

function getMetadata(appRoot) {
  return '<ol>' + readMetadata(appRoot, listMetadataStrategy, appRoot).join('\n') + '</ol>';
}

function livereload() {
  minilr.listen(CONFIG.LIVE_RELOAD_PORT);
}

function transformPath(plugins, env) {
  return function (filepath) {
    var filename = filepath.replace('/' + PATH.dest[env].all, '');
    arguments[0] = join(CONFIG.APP_BASE, filename);
    return plugins.inject.transform.apply(plugins.inject.transform, arguments);
  };
}

function injectableDevAssetsRef() {
  var src = PATH.src.lib.map(function (path) {
    return join(PATH.dest.dev.lib, slash(path).split('/').pop());
  });
  src.push(join(PATH.dest.all, '/init.js'));
  return src;
}

function relativePath(fileLocation) {
  fileLocation = path.dirname(fileLocation);
  var parentDir = __dirname.replace(join('tools'), '');
  var result = join('/', fileLocation.replace(join(parentDir, 'app'), ''), '/');
  return result;
}

function templateLocals() {
  return {
    APP_BASE: CONFIG.APP_BASE,
    EXAMPLES_LIST: getMetadata(join(CONFIG.APP_SRC))
  };
}

function tsProject(plugins) {
  return plugins.typescript.createProject('tsconfig.json', {
    typescript: require('typescript')
  });
}

function serveSPA(env) {
  var app = express();
  app.use(
    CONFIG.APP_BASE,
    connectLivereload( { port: CONFIG.LIVE_RELOAD_PORT }),
    serveStatic( resolve(process.cwd(), PATH.dest[env].all))
  );

  app.all(CONFIG.APP_BASE + '*', function (req, res) {
    res.sendFile(resolve(process.cwd(), PATH.dest[env].all, '404.html'));
  });

  app.listen(CONFIG.PORT, function () {
    openResource('http://localhost:' + CONFIG.PORT + CONFIG.APP_BASE);
  });
}

module.exports.serveSPA = serveSPA;
module.exports.relativePath = relativePath;
module.exports.tsProject = tsProject;
module.exports.templateLocals = templateLocals;
module.exports.injectableDevAssetsRef = injectableDevAssetsRef;
module.exports.notifyLiveReload = notifyLiveReload;
module.exports.transformPath = transformPath;
module.exports.livereload = livereload;

