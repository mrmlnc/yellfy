'use strict';

const $ = use(
  'gulp-clean-css',
  'gulp-rename'
);

function task() {
  return $.gulp.src('build/styles/styles.css')
    .pipe($.cleanCss())
    .pipe($.rename('styles.min.css'))
    .pipe($.gulp.dest('build/styles'));
}

module.exports = {
  task
};
