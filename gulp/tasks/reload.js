'use strict';

const $ = use('browser-sync');

function task() {
  return $.browserSync.reload();
}

module.exports = {
  task
};
