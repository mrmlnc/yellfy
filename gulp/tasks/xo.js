'use strict';

const $ = use('gulp-xo');

function xoErrorHandler() {
  this.emit('end');
}

function task() {
  return $.gulp.src(['**/*.js', '!{inline,vendor}/**'], { cwd: 'app/scripts' })
    .pipe($.xo().on('error', xoErrorHandler));
}

module.exports = {
  task
};
