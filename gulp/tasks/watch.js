'use strict';

const $ = use('browser-sync');

function task() {
  $.browserSync({
    online: false,
    notify: false,
    logPrefix: 'Yellfy',
    server: ['build'],
    port: 8000
  });

  // Directory synchronization
  $.gulp.watch([
    'app/images/**/*.{gif,jpg,png,svg}',
    'app/{scripts,styles}/vendor/**',
    'app/*'
  ], $.gulp.series('sync', 'reload'));

  // Scripts
  $.gulp.watch([
    'app/scripts/**/*.js',
    '!app/scripts/{vendor,inline}'
  ], $.gulp.series('xo', 'scripts', 'reload'));

  // Styles
  $.gulp.watch(
    'app/styles/less/**/*.less',
    $.gulp.series('styles', 'reload')
  );

  // Templates
  $.gulp.watch([
    'app/templates/**/*',
    'app/{scripts,styles}/inline/**'
  ], $.gulp.series('templates', 'reload'));

  // Bower
  $.gulp.watch(['bower.json'], $.gulp.series(
    $.gulp.parallel('sync-bower', 'templates'),
    'reload'
  ));
}

module.exports = {
  task
};
