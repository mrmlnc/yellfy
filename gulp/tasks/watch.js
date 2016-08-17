'use strict';

const $ = use('gulp-connect', 'opn');

function task() {
  global.watch = true;

  $.connect.server({
    name: '[Yellfy]',
    root: 'build',
    livereload: true,
    port: 8000
  });

  $.opn('http://localhost:8000');

  // Directory synchronization
  $.gulp.watch([
    'app/fonts/**',
    'app/images/**/*.{gif,jpg,png,svg}',
    '!app/images/icons/**/*',
    'app/{scripts,styles}/vendor/**',
    'app/*'
  ], $.gulp.series('sync', 'reload'));

  // Scripts
  $.gulp.watch([
    'app/scripts/modules/**/*.js',
    'app/scripts/*.js'
  ], $.gulp.series('scripts', 'reload'));

  // Styles
  $.gulp.watch(['app/styles/less/**/*.less'], $.gulp.series('styles', 'reload'));

  // Templates
  $.gulp
    .watch(['app/templates/**/*'], $.gulp.series('templates', 'reload'))
    .on('all', (event, path) => {
      global.changedTemplateFile = path.replace(/\\/g, '/');
    });

  // Icons
  $.gulp.watch(['app/images/icons/**/*.svg'], $.gulp.series('sprite', 'reload'));
}

module.exports = {
  task
};
