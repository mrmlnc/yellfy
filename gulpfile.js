'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const del = require('del');
const quaff = require('quaff');
const wiredep = require('wiredep').stream;
const CleanCSS = require('clean-css');
const map = require('vinyl-map');

// Browser Sync
const browserSync = require('browser-sync');

// Yellfy libs
const config = require('./config');
const handlers = require('./handlers');

// Plugins for Less and PostCSS
const lessPluginGlob = require('less-plugin-glob');
const autoprefixer = require('autoprefixer');

// Cleaning the temporary directory and directory of builds
gulp.task('clean', () => del(['.tmp', 'build'], { dot: true }));

// Browser Sync reload
gulp.task('reload', () => browserSync.reload());

// Synchronize two directories: `app` and `build`
gulp.task('sync', (done) => {
  $.filesSync([
    'app/fonts/**',
    'app/images/**/*.{png,svg,jpg,gif}',
    '!app/images/icons/**',
    'app/{scripts,styles}/vendor/**',
    'app/*'
  ], 'build', {
    base: 'app',
    ignoreInDest: [
      'styles/*.{css,map,less}',
      'scripts/*.{js,map}',
      '*.html'
    ]
  })
    .on('error', handlers.filesSyncError)
    .on('end', done)
    .end();
});

// Sync Bower dependencies
gulp.task('sync:bower', (done) => {
  const bowerDeps = handlers.bowerSync();

  if (!bowerDeps.length) {
    return done();
  }

  return gulp.src(bowerDeps, { read: false })
    .pipe(gulp.symlink('build/bower_components'));
});

// Linting JavaScript files
gulp.task('lint', () =>
  gulp.src(['**/*.js', '!{inline,vendor}/**'], { cwd: 'app/scripts' })
    .pipe($.xo().on('error', handlers.xoError))
);

// Transpiles ES2015 code to ES5 and concatenate JavaScript files
gulp.task('scripts:babel', () =>
  gulp.src(['**/*.js', '!{inline,vendor}/**'], { cwd: 'app/scripts' })
    .pipe($.newer('.tmp/scripts'))
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['es2015']
    }).on('error', handlers.babelError))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
  );

gulp.task('scripts:concat', () =>
  gulp.src('.tmp/scripts/**/*.js')
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.concat('scripts.bundle.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('build/scripts'))
  );

gulp.task('scripts', gulp.series('scripts:babel', 'scripts:concat'));

// Compile Less files, add vendor prefixes to rules and combine media queries
gulp.task('styles', () =>
  gulp.src('app/styles/less/styles.less')
    .pipe($.sourcemaps.init())
    .pipe($.less({
      plugins: [lessPluginGlob]
    }).on('error', handlers.lessError))
    .pipe($.postcss([
      autoprefixer({ browsers: config.autoprefixer })
    ]))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('build/styles'))
);

// Compile Nunjucks files and inject Bower components.
gulp.task('templates', () => {
  const data = quaff('app/templates/data');
  return gulp.src('app/templates/*.html')
    .pipe($.nunjucks.compile(data).on('error', handlers.nunjucksError))
    .pipe($.jsbeautifier(config.jsbeautifier))
    .pipe(wiredep({
      onError: handlers.wiredepError
    }))
    .pipe(gulp.dest('build'));
});

// Compression of the generated files
gulp.task('compress:scripts', () =>
  gulp.src('build/scripts/scripts.bundle.js')
    .pipe($.uglify())
    .pipe($.rename('scripts.bundle.min.js'))
    .pipe(gulp.dest('build/scripts'))
);

gulp.task('compress:styles', () => {
  const minify = map((buff) => new CleanCSS().minify(buff.toString()).styles);
  return gulp.src('build/styles/styles.css')
    .pipe(minify)
    .pipe($.rename('styles.min.css'))
    .pipe(gulp.dest('build/styles'));
});

gulp.task('compress:images', () =>
  gulp.src(['build/images/**/*'])
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('build/images'))
);

gulp.task('compress', gulp.parallel(
  'compress:scripts',
  'compress:styles',
  'compress:images'
));

// Build the project to develop
gulp.task('build:default', gulp.series(
  'clean',
  gulp.parallel('lint'),
  gulp.parallel('sync', 'sync:bower', 'templates', 'scripts', 'styles')
));

// Build the project, runs the server and Watch files for changes & reload
gulp.task('serve', () => {
  browserSync({
    online: false,
    notify: false,
    logPrefix: 'Yellfy',
    server: ['build'],
    port: 8000
  });

  // Directory synchronization
  gulp.watch([
    'app/images/**/*.{png,svg,jpg,gif}',
    '!app/images/icons/**',
    'app/scripts/vendor/**',
    'app/styles/vendor/**',
    'app/*'
  ], gulp.series('sync', 'reload'));

  // Scripts
  gulp.watch([
    'app/scripts/**/*.js',
    '!app/scripts/{vendor,inline}'
  ], gulp.series('lint', 'scripts', 'reload'));

  // Styles
  gulp.watch(
    ['app/styles/less/**/*.less'],
    gulp.series('styles', 'reload')
  );

  // Templates
  gulp.watch(['app/templates/**/*'], gulp.series('templates', 'reload'));

  // Bower
  gulp.watch(['bower.json'], gulp.series(
    gulp.parallel('sync:bower', 'templates'),
    'reload'
  ));
});

// Build and runs the server
gulp.task('server', gulp.series('build:default', () =>
  browserSync({
    notify: false,
    logPrefix: 'Yellfy',
    server: ['build'],
    port: 80
  })
));

// General building tasks
gulp.task('default', gulp.series('build:default', 'serve'));
gulp.task('build', gulp.series('build:default', 'compress'));
