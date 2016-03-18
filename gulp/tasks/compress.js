'use strict';

const $ = use();

function task(done) {
  $.gulp.parallel(
    'compress-images',
    'compress-styles',
    'compress-scripts'
  )(done);
}

module.exports = {
  task
};
