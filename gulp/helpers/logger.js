'use strict';

const chalk = require('chalk');
const timestamp = require('time-stamp');

function log(color, message) {
  const time = chalk[color](timestamp('HH:mm:ss'));
  const arrow = chalk[color]('>>');

  console.log(chalk.grey(`[${time}] ${arrow}`), message);
}

module.exports = {
  error: (message) => log('red', message),
  warning: (message) => log('yellow', message),
  success: (message) => log('green', message),
  info: (message) => log('blue', message)
};
