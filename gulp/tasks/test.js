'use strict';

const $ = use(
  'chalk',
  'del',
  'gulp-xo',
  'gulp-babel',
  'babel-preset-es2015-rollup',
  'gulp-concat',
  'gulp-mocha-phantomjs'
);

function babelErrorHandler(err) {
  let msg = [err.name + ': ' + err.message.replace($.helper.slash(process.cwd) + '/', '')];
  msg = msg.concat(err.codeFrame.split('\n'));
  msg.forEach((line) => {
    console.log($.chalk.red('>> ') + line);
  });

  this.emit('end');
}

function clean() {
  return $.del(['.tmp'], { dot: true });
}

function babel() {
  return $.gulp.src('app/scripts/tests/**/*.js')
    .pipe($.xo())
    .pipe($.babel({ presets: 'es2015-rollup' }).on('error', babelErrorHandler))
    .pipe($.concat('tests.bundle.js'))
    .pipe($.gulp.dest('./.tmp/tests'));
}

function phantom() {
  return $.gulp.src('app/scripts/tests/runner.html')
    .pipe($.mochaPhantomjs({
      reporter: 'spec',
      phantomjs: {
        viewportSize: {
          width: 1024,
          height: 768
        },
        useColors: true
      }
    }));
}

function task(done) {
  $.gulp.series(clean, babel, phantom)(done);
}

module.exports = {
  task
};
