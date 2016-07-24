'use strict';

const path = require('path');
const fs = require('fs');

const $ = use(
  'chalk',
  'gulp-filter',
  'gulp-pug',
  'wiredep'
);

function getJsonData(dir) {
  const obj = {};
  const errors = [];

  fs.readdirSync(dir).forEach((fileName) => {
    const basename = path.basename(fileName, '.json');
    const filepath = path.join(dir, fileName);

    try {
      const data = fs.readFileSync(filepath);
      obj[basename] = JSON.parse(data);
    } catch (err) {
      errors.push($.chalk.magenta(fileName));
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
      line = $._.paths.removeProjectRoot(line);
      $._.logger.error(line);
    }
  });
}

function wiredepErrorHandler(err) {
  if (err.code === 'BOWER_COMPONENTS_MISSING') {
    err = 'Cannot find where you keep your Bower packages.';
  }

  $._.logger.error(err);
}

function task(done) {
  const data = getJsonData('app/templates/data');
  if (typeof data !== 'object') {
    $._.logger.error(`JSON syntax error: ${data}`);
    return done();
  }

  const pathsTree = $._.pugInheritance.getPathsTree();

  return $.gulp.src('app/templates/*.pug')
    .pipe($.filter((file) => {
      if (!global.watch) {
        return true;
      }

      const changed = global.changedTplFile;
      if (pathsTree[file.relative].includes(changed) || changed.includes('data/')) {
        $._.logger.success(`Compiling: ${file.relative}`);
        return true;
      }

      return false;
    }))
    .pipe($.pug({
      pretty: true,
      data
    }).on('error', function(err) {
      $._.errorHandler(err, this, done, pugErrorHandler);
    }))
    .pipe($.wiredep.stream({
      onError: wiredepErrorHandler
    }))
    .pipe($.gulp.dest('build'));
}

module.exports = {
  task
};
