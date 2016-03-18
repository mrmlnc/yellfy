'use strict';

const path = require('path');
const fs = require('fs');

function validateTask(task) {
  return Boolean(task.task);
}

function getTasks() {
  const taskDirFiles = fs.readdirSync('./gulp/tasks');

  let validTasks = [];
  let invalidTasks = [];
  taskDirFiles.forEach((taskFile) => {
    const taskName = path.basename(taskFile, '.js');
    const task = require(path.join('../tasks', taskFile));
    const taskObj = {
      name: taskName,
      task: task.task
    };

    if (!validateTask(task)) {
      invalidTasks.push(taskObj);
      return;
    }

    validTasks.push(taskObj);
  });

  return {
    valid: validTasks,
    invalid: invalidTasks
  };
}

module.exports = {
  getTasks
};
