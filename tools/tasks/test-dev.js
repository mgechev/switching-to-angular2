"use strict";

var CONFIG = require('../workflow.config');
var join = require('path').join;

module.exports = function (gulp, plugins) {
  return function () {
    plugins.watch(join(CONFIG.APP_BASE, '**'), function () {
      gulp.start('build.test');
    });
  };
};
