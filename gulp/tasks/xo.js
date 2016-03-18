'use strict';

const $ = use('gulp-xo');

function task() {
  return $.gulp.src(['app/scripts/rollup/**/*.js'])
    .pipe($.xo());
}

module.exports = {
  task
};
