'use strict';

const chalk = require('chalk');
const tasks = require('./tasks');
const register = require('./register');
require('./use');

const listOfTask = tasks.getTasks();
if (listOfTask.invalid.length) {
  const invalid = listOfTask.invalid.map((task) => task.name).join(', ');
  console.log(chalk.red('>>') + ` Invalid tasks: ${invalid}`);
  process.exit(1);
}

if (!listOfTask.valid) {
  console.log(chalk.red('>>') + ' All tasks are not valid.');
  process.exit(1);
}

if (GLOBAL.needDeps.length) {
  console.log(chalk.red('>>') + ` Use 'npm i -D ${GLOBAL.needDeps.join(' ')}'`);
  process.exit(1);
}

listOfTask.valid.forEach((task) => {
  register.task(task);
});
