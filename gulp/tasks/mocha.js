'use strict';

const $ = use('gulp-mocha');

function mochaErrorHandler() {
  this.emit('end');
}

function task() {
  return $.gulp.src('app/scripts/tests/**/*.js', { read: false })
    .pipe($.mocha({ reporter: 'spec' }))
    .on('error', mochaErrorHandler);
}

module.exports = {
  task
};
