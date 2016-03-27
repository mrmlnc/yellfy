'use strict';

const $ = use('gulp-xo');

function task() {
  return $.gulp.src(['**/*.js', '!{inline,vendor,tests}/**'], { cwd: 'app/scripts' })
    .pipe($.xo());
}

module.exports = {
  task
};
