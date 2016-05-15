'use strict';

const _ = require('../helpers/pug-inheritance');
const $ = use(
  'chalk',
  'slash',
  'gulp-filter',
  'gulp-pug',
  'quaff',
  'wiredep'
);

function pugErrorHandler(err) {
  let msg = err.message.split('\n');
  msg[0] = err.name + ': ' + msg[0];
  msg.forEach((line) => {
    line = $.slash(line.replace(process.cwd() + '\\', ''));
    console.log($.chalk.red('>> ') + line);
  });

  this.emit('end');
}

function wiredepErrorHandler(err) {
  if (err.code === 'BOWER_COMPONENTS_MISSING') {
    err = 'Warning: Cannot find where you keep your Bower packages.';
  }

  console.log($.chalk.red('>> ') + err);
}

function task() {
  const data = $.quaff('app/templates/data');
  const pathsTree = _.getPathsTree();

  return $.gulp.src('app/templates/*.pug')
    .pipe($.filter((file) => {
      if (!global.watch) {
        return true;
      }

      const changed = global.changedTplFile;
      if (pathsTree[file.relative].includes(changed) || changed.includes('data/')) {
        console.log($.chalk.green('>> ') + 'Compiling: ' + file.relative);
        return true;
      }

      return false;
    }))
    .pipe($.pug({
      pretty: true,
      data
    }).on('error', pugErrorHandler))
    .pipe($.wiredep.stream({
      onError: wiredepErrorHandler
    }))
    .pipe($.gulp.dest('build'));
}

module.exports = {
  task
};
