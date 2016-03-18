'use strict';

const $ = use(
  'gulp-uglify',
  'gulp-rename'
);

function task() {
  return $.gulp.src('build/scripts/*.js')
    .pipe($.uglify())
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.gulp.dest('build/scripts'));
}

module.exports = {
  task
};
