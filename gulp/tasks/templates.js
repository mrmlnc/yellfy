'use strict';

const path = require('path');
const $ = use(
  'chalk',
  'slash',
  'gulp-jade',
  'gulp-data',
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

function injectHandler(filepath, file) {
  const ext = path.extname(filepath);
  const content = file.contents.toString('utf8')
    .replace(/\n/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (ext === '.js') {
    return `<script>${content}</script>`;
  }

  return `<style>${content}</style>`;
}

function task() {
  return $.gulp.src('app/templates/*.jade')
    .pipe($.data($.quaff('app/templates/data')))
    .pipe($.jade({
      pretty: true
    }).on('error', jadeErrorHandler))
    .pipe($.inject($.gulp.src('app/{scripts,styles}/inline/**/*.{js,css}'), {
      starttag: '<!-- inject:{{ext}} -->',
      transform: injectHandler
    }))
    .pipe($.wiredep.stream({
      onError: wiredepErrorHandler
    }))
    .pipe($.gulp.dest('build'));
}
module.exports = {
  task
};
