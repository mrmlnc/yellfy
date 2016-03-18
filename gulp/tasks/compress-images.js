'use strict';

const $ = use('gulp-imagemin');

function task() {
  return $.gulp.src(['build/images/**/*'])
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        { cleanupIDs: false }
      ]
    }))
    .pipe($.gulp.dest('build/images'));
}

module.exports = {
  task
};
