'use strict';

const $ = use('browser-sync');

function task(done) {
  $.browserSync.reload();
  done();
}

module.exports = {
  task
};
