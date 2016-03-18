'use strict';

const gulp = require('gulp');

function task(task) {
  gulp.task(task.name, task.task);
}

module.exports = {
  task
};
