'use strict';

const $ = use('gulp-xo');

function task(done) {
  return $.gulp.src([
    'app/scripts/modules/**/*.js',
    'app/scripts/scripts.js'
  ])
    .pipe($.xo().on('error', function(err) {
      $._.errorHandler(err, this, done, () => done());
    }));
}

module.exports = {
  task
};
