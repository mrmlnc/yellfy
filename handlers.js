'use strict';

const path = require('path');
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
 * Handler to ignore files when synchronizing directories
 *
 * @param {String} dir
 * @param {String} file
 */
module.exports.syncIgnore = (dir, file) => {
  const filepath = slash(path.join(dir, file));
  const ignore = [
    // Images
    'app/images/icons',
    'build/images/sprite.svg',
    // Styles
    'app/styles/less',
    'build/styles/styles.css',
    'build/styles/styles.css.map',
    // Scripts
    'app/scripts',
    'build/scripts/scripts.bundle.js',
    'build/scripts/scripts.bundle.js.map',
    // templates
    'app/templates'
  ];

  return ignore.some((item) => {
    // Ignore HTML files in build directory
    var isBuildDir = filepath.indexOf('build/') + 1;
    var isHtmlFile = filepath.indexOf('.html') + 1;
    if (isBuildDir && isHtmlFile) {
      return true;
    }

    return filepath.indexOf(item) + 1;
  });
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
 * Error handler for Jade plugin
 *
 * @param {object} err - The error object from Jade plugin
 */
module.exports.jadeError = function(err) {
  let msg = removeCwdFromPaths(err.message, cwd).split('\n');
  msg[0] = `${err.name}: ${msg[0]}`;
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
