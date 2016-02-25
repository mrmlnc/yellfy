'use strict';

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const slash = require('slash');
const browserSync = require('browser-sync');
const beeper = require('beeper');
const cwd = process.cwd();
const arrow = {
  error: chalk.red('>>'),
  warning: chalk.yellow('>>')
};

// Show error from Wiredep only one times
let wiredepStatus = 0;

/**
 * Remove cwd from paths in error message
 *
 * @param {String} msg
 * @param {String} cwd
 */
const removeCwdFromPaths = (msg, cwd) => {
  cwd = cwd.replace(/\\/g, '\\\\') + '\\\\';
  return slash(msg.replace(new RegExp(cwd, 'g'), ''));
};

/**
 * Preparation of a list of dependencies
 */
module.exports.bowerSync = function() {
  try {
    const raw = fs.readFileSync(path.join(cwd, 'bower.json'));
    const json = JSON.parse(raw);
    return Object.keys(json.dependencies).map(function(filepath) {
      return path.join('bower_components', filepath, '/');
    });
  } catch (err) {
    return [];
  }
};

/**
 * Error handler for files-sync plugin
 *
 * @param {object} err - The error object from files-sync plugin
 */
module.exports.filesSyncError = function(err) {
  console.log(`${arrow.error} ${err.message}`);

  // If this does not live work with watching
  if (!browserSync.active) {
    process.exit(1);
  }

  beeper(1);

  // If it's live work, then output the error and continue watching
  this.emit('end');
};

/**
 * Error handler for XO plugin
 *
 * @param {object} err - The error object from XO plugin
 */
module.exports.xoError = function() {
  // If this does not live work with watching
  if (!browserSync.active) {
    process.exit(1);
  }

  beeper(1);

  // If it's live work, then output the error and continue watching
  this.emit('end');
};

/**
 * Error handler for Babel plugin
 *
 * @param {object} err - The error object from Babel plugin
 */
module.exports.babelError = function(err) {
  let msg = [err.name + ': ' + err.message.replace(slash(cwd) + '/', '')];
  msg = msg.concat(err.codeFrame.split('\n'));
  msg.forEach((line) => {
    console.log(`${arrow.error} ${line}`);
  });

  beeper(1);

  // If this does not live work with watching
  if (!browserSync.active) {
    process.exit(1);
  }

  // If it's live work, then output the error and continue watching
  this.emit('end');
};

/**
 * Error handler for Nunjucks plugin
 *
 * @param {object} err - The error object from Nunjucks plugin
 */
module.exports.nunjucksError = function(err) {
  const filePath = removeCwdFromPaths(err.fileName, cwd);
  let msg = [`The main file: ${filePath}`];
  msg = msg.concat(removeCwdFromPaths(err.message, cwd).split('\n'));
  msg.forEach((line) => {
    console.log(`${arrow.error} ${line}`);
  });

  beeper(1);

  // If this does not live work with watching
  if (!browserSync.active) {
    process.exit(1);
  }

  // If it's live work, then output the error and continue watching
  this.emit('end');
};

module.exports.injectHandler = function(filepath, file) {
  if (file.extname === '.js') {
    return `<script>${file.contents.toString('utf8')}</script>`;
  } else if (file.extname === '.css') {
    return `<style>${file.contents.toString('utf8')}</style>`;
  }

  return file.contents.toString('utf8');
};

/**
 * Error handler for Wiredep plugin
 *
 * @param {object} err - The error object from Wiredep plugin
 */
module.exports.wiredepError = function(err) {
  if (wiredepStatus) {
    return;
  }

  if (err.code === 'BOWER_COMPONENTS_MISSING') {
    err = 'Warning: Cannot find where you keep your Bower packages.';
  } else if (err.code === 'ENOENT') {
    err = 'Warning: Cannot find \'bower.json\' file.';
  }

  wiredepStatus = 1;
  console.log(`${arrow.warning} ${err}`);
};

/**
 * Error handler for Less plugin
 *
 * @param {object} err - The error object from Less plugin
 */
module.exports.lessError = function(err) {
  const msg = removeCwdFromPaths(err.message, cwd);
  console.log(`${arrow.error} ${err.type}Error: ${msg}`);

  err.extract.forEach((line, index) => {
    index = index + err.line - 1;
    if (index === err.line) {
      line = `${arrow.error}   > ${index}| ${line}`;
    } else {
      line = `${arrow.error}     ${index}| ${line}`;
    }

    console.log(line);
  });

  beeper(1);

  // If this does not live work with watching
  if (!browserSync.active) {
    process.exit(1);
  }

  // If it's live work, then output the error and continue watching
  this.emit('end');
};
