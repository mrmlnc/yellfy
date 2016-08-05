'use strict';

const $ = use(
  'rollup',
  'rollup-plugin-babel as babel',
  'gulp-connect',
  'opn'
);

const { paths, logger } = $.helpers;

function copyTestEntryFile() {
  return $.gulp.src(['app/tests.html'], { base: 'app' }).pipe($.gulp.dest('build'));
}

function rollupErrorHandler(err) {
  err.message = paths.removeProjectRoot(err.message).replace(/.*:\s+app\//, 'app/');

  logger.error(err.toString());

  if (err.codeFrame) {
    err.codeFrame.split('\n').forEach(logger.error);
  }
}

function makeTestBundle() {
  const rollupOptions = {
    entry: './app/scripts/tests.js',
    plugins: [$.babel({
      babelrc: false,
      presets: ['es2015-rollup']
    })]
  };

  return $.rollup.rollup(rollupOptions).then((bundle) => {
    return bundle.write({
      format: 'iife',
      dest: 'build/scripts/tests.bundle.js'
    });
  }).catch(rollupErrorHandler);
}

function task(done) {
  $.gulp.series(
    'build',
    copyTestEntryFile,
    makeTestBundle,
    function startServer() {
      $.connect.server({
        name: '[Yellfy]',
        root: 'build',
        port: 8001
      });

      $.opn('http://localhost:8001/tests.html');
    }
  )(done);
}

module.exports = {
  task
};
