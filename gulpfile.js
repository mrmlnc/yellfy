'use strict';

const exit = process.exit;
const { Use } = require('yellfy-use');
const logger = require('./gulp/helpers/logger');

let needToInstall = [];

global.use = new Use({
  gulp: require('gulp'),
  helperDir: './gulp/helpers',
  reporter: (toInstall) => {
    needToInstall = needToInstall.concat(toInstall);
  }
}).use;

require('./gulp/yellfy/bootstrap');

if (needToInstall.length) {
  const toInstall = needToInstall.join(' ');

  logger.error('Something is not enough.');
  logger.error(`Use 'npm i -D ${toInstall}'`);
  exit(1);
}
