'use strict';

const $ = use();

function task(done) {
  $.gulp.parallel(
    'lint-templates',
    'lint-styles',
    'lint-scripts'
  )(done);
}

module.exports = {
  task
};
