"use strict";

var CONFIG = require('../workflow.config');
var join = require('path').join;

module.exports = function (gulp) {
  return function () {
    return gulp.src(join(CONFIG.CHAPTERS, '**'))
      .pipe(gulp.dest(CONFIG.APP_SRC));
  };
};
