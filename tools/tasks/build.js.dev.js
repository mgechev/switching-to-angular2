"use strict";

var path = require('path');
var join = path.join;
var CONFIG = require('../workflow.config');
var utils = require('../utils');
var data = require('gulp-data');
var merge = require('merge');

module.exports = function (gulp, plugins) {
  return function () {
    var tsProject = utils.tsProject(plugins);

    var result = gulp.src(
      [
        join(CONFIG.PATH.src.all, '**/*ts'),
        '!' + join(CONFIG.PATH.src.all, '**/*_spec.ts')
      ])

      .pipe(plugins.plumber())
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(plugins.sourcemaps.write())
      .pipe(data(function (file) {
        return merge({ currentPath: utils.relativePath(file.path) }, utils.templateLocals());
      }))
      .pipe(plugins.template(utils.templateLocals()))
      .pipe(gulp.dest(CONFIG.PATH.dest.dev.all));
  };
};
