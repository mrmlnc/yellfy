'use strict';

const $ = use('del');

function task() {
  return $.del(['.tmp', 'build'], { dot: true });
}

module.exports = {
  task
};
