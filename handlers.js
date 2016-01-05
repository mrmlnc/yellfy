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

let wiredepStatus = 0;

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
 * Error handler for Xo plugin
 *
 * @param {object} err - The error object from Xo plugin
 */
module.exports.xoError = function() {
  if (!browserSync.active) {
    process.exit(1);
  }

  beeper(1);
  this.emit('end');
};

/**
 * Error handler for Jade plugin
 *
 * @param {object} err - The error object from Jade plugin
 */
module.exports.jadeError = function(err) {
  let msg = slash(err.message.replace(cwd + '\\', '')).split('\n');
  msg[0] = `${err.name}: ${msg[0]}`;
  msg.forEach((line) => {
    console.log(`${arrow.error} ${line}`);
  });

  beeper(1);

  if (!browserSync.active) {
    process.exit(1);
  }

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
  const msg = slash(err.message.replace(cwd + '\\', ''));
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

  if (!browserSync.active) {
    process.exit(1);
  }

  this.emit('end');
};
