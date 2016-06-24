'use strict';

const gulp = require('gulp');

function registerTask(task) {
  gulp.task(task.name, task.task);
}

module.exports = {
  registerTask
};
