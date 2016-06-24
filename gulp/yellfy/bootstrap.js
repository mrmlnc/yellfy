'use strict';

const exit = process.exit;
const { red } = require('chalk');
const { getTasks } = require('./tasks');
const { registerTask } = require('./register');
require('./use');

const listOfTask = getTasks();
if (listOfTask.invalid.length) {
  const invalid = listOfTask.invalid.map((task) => task.name).join(', ');
  console.log(red('>>') + ` Invalid tasks: ${invalid}`);
  exit(1);
}

if (!listOfTask.valid) {
  console.log(red('>>') + ' All tasks are not valid.');
  exit(1);
}

if (global.needDeps.length) {
  console.log(red('>>') + ` Use 'npm i -D ${global.needDeps.join(' ')}'`);
  exit(1);
}

listOfTask.valid.forEach((task) => {
  registerTask(task);
});
