'use strict';

const $ = use('gulp-xo');

function task() {
  return $.gulp.src([
    'app/scripts/modules/**/*.js',
    'app/scripts/scripts.js'
  ])
    .pipe($.xo());
}

module.exports = {
  task
};
