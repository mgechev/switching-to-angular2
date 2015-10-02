"use strict";

var path = require('path');
var join = path.join;
var PATH = require('../workflow.config').PATH;
var utils = require('../utils');
var data = require('gulp-data');
var tap = require('gulp-tap');
var merge = require('merge');

function getInit(path, file) {
  file = file || 'app';
  return '<script>System.import("' + path + '/' + file + '").catch(function (e) { console.error("Report this error to mgechev", e) });</script>'
}

module.exports = function (gulp, plugins) {
  return function () {
    var target = gulp.src(utils.injectableDevAssetsRef(), {read: false});
    return gulp.src(join(PATH.src.all, '/**/*.html'))
      .pipe(plugins.inject(target, {transform: utils.transformPath(plugins, 'dev')}))
      .pipe(data(function (file) {
        return merge({ INIT: getInit(utils.relativePath(file.path)) }, utils.templateLocals());
      }))
      .pipe(plugins.template())
      .pipe(gulp.dest(PATH.dest.dev.all));
  };
};
