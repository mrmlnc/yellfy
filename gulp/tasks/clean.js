'use strict';

const $ = use('del');

function task() {
  return $.del(['build'], { dot: true });
}

module.exports = {
  task
};
