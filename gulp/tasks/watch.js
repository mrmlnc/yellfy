'use strict';

const $ = use('gulp-connect');

function task() {
  global.watch = true;

  $.connect.server({
    name: 'Yellfy',
    root: 'build',
    livereload: true,
    port: 8000
  });

  // Directory synchronization
  $.gulp.watch([
    'app/fonts/**',
    'app/images/**/*.{gif,jpg,png,svg}',
    'app/{scripts,styles}/vendor/**',
    'app/*'
  ], $.gulp.series('sync', 'reload'));

  // Scripts
  $.gulp.watch([
    'app/scripts/modules/**/*.js',
    'app/scripts/scripts.js'
  ], $.gulp.series('lint-scripts', 'scripts', 'reload'));

  // Tests
  $.gulp.watch([
    'app/scripts/tests/**/*.js'
  ], $.gulp.series('test'));

  // Styles
  $.gulp.watch(
    'app/styles/less/**/*.less',
    $.gulp.series('styles', 'reload')
  );

  // Templates
  $.gulp
    .watch([
      'app/templates/**/*'
    ], $.gulp.series('templates', 'reload'))
    .on('all', (event, path) => {
      global.changedTplFile = path.replace(/[\\\/]/g, '/').replace(/app\/templates\//, '');
    });

  // Bower
  $.gulp.watch(['bower.json'], $.gulp.series(
    $.gulp.parallel('sync-bower', 'templates'),
    'reload'
  ));
}

module.exports = {
  task
};
