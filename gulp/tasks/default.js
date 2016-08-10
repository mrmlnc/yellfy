'use strict';

const $ = use();

function task(done) {
  $.gulp.series(
    'clean',
    'lint',
    'sprite',
    $.gulp.parallel('sync', 'templates', 'scripts', 'styles'),
    'watch'
  )(done);
}

module.exports = {
  task
};
