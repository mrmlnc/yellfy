'use strict';

const $ = use();

function task(done) {
  $.gulp.series(
    'clean',
    $.gulp.series('xo', 'mocha'),
    $.gulp.parallel('sync', 'sync-bower', 'templates', 'scripts', 'styles'),
    'watch'
  )(done);
}

module.exports = {
  task
};
