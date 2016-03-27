'use strict';

const $ = use(
  'gulp-xo',
  'gulp-babel',
  'gulp-concat',
  'merge-stream',
  'gulp-mocha-phantomjs'
);

function task() {
  const babel = $.gulp.src('app/scripts/tests/**/*.js')
    .pipe($.xo())
    .pipe($.babel({ presets: 'es2015' }))
    .pipe($.concat('tests.bundle.js'))
    .pipe($.gulp.dest('./.tmp/tests'));

  const phantom = $.gulp.src('app/scripts/tests/runner.html')
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

  return $.mergeStream(babel, phantom);
}

module.exports = {
  task
};
