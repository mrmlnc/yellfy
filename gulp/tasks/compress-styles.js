'use strict';

const $ = use(
  'gulp-csso',
  'gulp-rename'
);

function task() {
  return $.gulp.src('build/styles/styles.css')
    .pipe($.csso())
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.gulp.dest('build/styles'));
}

module.exports = {
  task
};
