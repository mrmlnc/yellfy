'use strict';

const $ = use('gulp-connect');

function task() {
  // Well, perhaps there are other ways?
  return $.gulp.src('package.json', {
    read: false,
    allowEmpty: true
  }).pipe($.connect.reload());
}

module.exports = {
  task
};
