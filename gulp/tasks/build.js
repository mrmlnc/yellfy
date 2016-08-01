'use strict';

const $ = use();

function task(done) {
  $.gulp.series(
    'clean',
    'lint',
    'test'
    $.gulp.parallel('sync', 'templates', 'scripts', 'styles'),
    'compress'
  )(done);
}

module.exports = {
  task
};
