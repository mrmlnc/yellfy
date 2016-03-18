'use strict';

const $ = use();

function task(done) {
  $.gulp.series(
    'clean',
    'xo',
    $.gulp.parallel('sync', 'sync-bower', 'templates', 'scripts', 'styles'),
    $.gulp.parallel('compress-images', 'compress-styles', 'compress-scripts')
  )(done);
}

module.exports = {
  task
};
