'use strict';

const fs = require('fs');
const chalk = require('chalk');

const dirs = [
  'app/fonts',
  'app/styles/inline',
  'app/styles/vendor',
  'app/scripts/inline',
  'app/scripts/vendor'
];

const existsSync = (filepath) => {
  try {
    fs.statSync(filepath);
    return true;
  } catch (err) {
    return false;
  }
};

console.log(chalk.yellow('Yellfy: ') + 'Creating structure of dirs...');

dirs.forEach((filepath) => {
  if (!existsSync(filepath)) {
    fs.mkdirSync(filepath);
    console.log(chalk.yellow('Yellfy: ') + chalk.green('>> ') + `created: ${filepath}`);
  }
});

console.log(chalk.yellow('Yellfy: ') + 'You can work!\n');
