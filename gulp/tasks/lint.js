'use strict';

const $ = use();

function task(done) {
  $.gulp.parallel(
    'lint-scripts',
    'lint-templates'
  )(done);
}

module.exports = {
  task
};
