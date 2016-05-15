'use strict';

const path = require('path');
const $ = use(
  'chalk',
  'slash',
  'gulp-pug',
  'quaff',
  'gulp-inject',
  'wiredep'
);

function jadeErrorHandler(err) {
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

  return $.gulp.src('app/templates/*.pug')
    .pipe($.pug({
      pretty: true,
      data
    }).on('error', jadeErrorHandler))
    .pipe($.wiredep.stream({
      onError: wiredepErrorHandler
    }))
    .pipe($.gulp.dest('build'));
}

module.exports = {
  task
};
