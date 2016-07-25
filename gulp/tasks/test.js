'use strict';

const $ = use(
  'chalk',
  'rollup',
  'rollup-plugin-multi-entry',
  'gulp-mocha-electron'
);

function rollup() {
  return $.rollup.rollup({
    entry: 'app/scripts/tests/**/*.js',
    plugins: [$.rollupPluginMultiEntry()],
    external: 'assert'
  }).then((bundle) => {
    return bundle.write({
      format: 'cjs',
      dest: 'build/scripts/scripts.tests.js'
    });
  }).catch((err) => {
    console.log($.chalk.red('>> ') + err);
  });
}

function test(done) {
  return $.gulp.src('build/scripts', { read: false })
    .pipe($.mochaElectron({
      tests: 'build/scripts/scripts.tests.js',
      electronMocha: {
        renderer: true
      }
    }).on('error', function(err) {
      $._.errorHandler(err, this, done, () => done());
    }));
}

function task(done) {
  $.gulp.series('xo', rollup, test)(done);
}

module.exports = {
  task
};
