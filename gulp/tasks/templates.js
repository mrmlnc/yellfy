'use strict';

const path = require('path');
const fs = require('fs');

const $ = use(
  'yellfy-pug-inheritance as pugInheritance',
  'gulp-filter',
  'gulp-pug'
);

const { logger, paths } = $.helpers;

// Cache for incremental rebuilds
let jsonDataCache = null;
let treeCache = {};

function getJsonData(dir) {
  const obj = {};
  const errors = [];

  fs.readdirSync(dir).forEach((filename) => {
    const basename = path.basename(filename, '.json');
    const filepath = path.join(dir, filename);

    try {
      const data = fs.readFileSync(filepath);
      obj[basename] = JSON.parse(data);
    } catch (err) {
      errors.push(filename);
    }
  });

  return errors.join(', ') || obj;
}

function pugErrorHandler(err) {
  err.message = err.message.split('\n');

  if (err.filename) {
    err.message[0] = `${err.name}: ${err.msg} in file ${err.filename} (${err.line || 0}:${err.column || 0})`;
  } else if (!err.code && !err.path) {
    err.message[0] = `${err.name}: ${err.message}`;
  }

  err.message.forEach((line) => {
    if (line !== '' && line !== err.msg) {
      line = paths.removeProjectRoot(line);
      logger.error(line);
    }
  });
}

function pugFilter(file, inheritance) {
  if (!global.watch) {
    return true;
  }

  const filepath = `app/templates/${file.relative}`;
  const needToUpdate = inheritance.checkDependency(filepath, global.changedTemplateFile);
  if (needToUpdate || path.extname(global.changedTemplateFile) === '.json') {
    logger.info(`Compiling: ${filepath}`);
    return true;
  }

  return false;
}

function task(done) {
  const changedFile = global.changedTemplateFile;
  if (!jsonDataCache || (changedFile && path.extname(changedFile) === '.json')) {
    jsonDataCache = getJsonData('app/templates/data');
  }

  if (typeof jsonDataCache !== 'object') {
    logger.error(`JSON syntax error: ${jsonDataCache}`);
    return done();
  }

  return new Promise((resolve, reject) => {
    $.pugInheritance.updateTree('./app/templates', { changedFile, treeCache }).then((inheritance) => {
      treeCache = inheritance.tree;

      $.gulp.src('app/templates/*.pug')
        .pipe($.filter((file) => pugFilter(file, inheritance)))
        .pipe($.pug({ pretty: true, data: jsonDataCache }).on('error', (err) => {
          pugErrorHandler(err);
          reject();
        }))
        .pipe($.gulp.dest('build'))
        .on('end', resolve)
        .on('error', reject);
    });
  });
}

module.exports = {
  task
};
