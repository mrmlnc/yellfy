'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const runSequence = require('run-sequence');
const del = require('del');
const quaff = require('quaff');
const wiredep = require('wiredep').stream;
const CleanCSS = require('clean-css');
const map = require('vinyl-map');

// Browser Sync
const browserSync = require('browser-sync');
const reload = browserSync.reload;

// Yellfy libs
const config = require('./config');
const handlers = require('./handlers');

// Plugins for Less and PostCSS
const lessPluginGlob = require('less-plugin-glob');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');

// Cleaning the temporary directory and directory of builds
gulp.task('clean', () => del(['.tmp', 'build'], { dot: true }));

// Synchronize two directories: `app` and `build`
gulp.task('sync', () => {
  $.filesSync(config.sync.src, config.sync.dest, {
    base: 'app',
    ignoreInDest: config.sync.ignore
  })
    .on('error', handlers.filesSyncError)
    .end();
});

// Sync Bower dependencies
gulp.task('sync:bower', () => {
  $.filesSync(handlers.bowerSync(), 'build/bower_components', {
    base: 'bower_components'
  })
    .on('error', handlers.filesSyncError)
    .end();
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
    .pipe(gulp.dest('.tmp/scripts'))
);

gulp.task('scripts', ['scripts:babel'], () =>
  gulp.src('.tmp/scripts/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.concat('scripts.bundle.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('build/scripts'))
);

// Compile Less files, add vendor prefixes to rules and combine media queries
gulp.task('styles', () =>
  gulp.src('app/styles/less/styles.less')
    .pipe($.sourcemaps.init())
    .pipe($.less({
      plugins: [lessPluginGlob]
    }).on('error', handlers.lessError))
    .pipe($.postcss([
      autoprefixer({ browsers: config.autoprefixer }),
      mqpacker
    ]))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('build/styles'))
);

// Compile Jade files, inject Bower components and contents of the inline files
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

// Generating SVG sprite
gulp.task('sprites', () =>
  gulp.src('app/images/icons/**/*.svg')
    .pipe($.svgSprite(config.svgSprite).on('error', console.log))
    .pipe(gulp.dest('build'))
);

// Compression built files
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

gulp.task('compress', [
  'compress:scripts',
  'compress:styles',
  'compress:images'
]);

// Builds the project to develop
gulp.task('build:default', (cb) =>
  runSequence(
    'clean',
    ['sprites', 'lint'],
    ['sync', 'templates', 'scripts', 'styles'],
    cb
  )
);

// Builds the project, runs the server and Watch files for changes & reload
gulp.task('serve', () => {
  browserSync({
    online: false,
    notify: false,
    logPrefix: 'Yellfy',
    server: ['build'],
    port: 8000
  });

  // Directory synchronization
  $.watch([
    'app/images/**/*.{png,svg,jpg,gif}',
    '!app/images/icons/**',
    'app/scripts/vendor/**',
    'app/styles/vendor/**',
    'app/*'
  ], $.batch((events, done) =>
    gulp.start(runSequence('sync', reload), done)
  ));

  // Scripts
  $.watch([
    'app/scripts/**/*.js',
    '!app/scripts/{vendor,inline}'
  ], $.batch((events, done) =>
    gulp.start(runSequence('lint', 'scripts', reload), done)
  ));

  // Sprites
  $.watch(['app/images/icons/**/*.svg'], $.batch((events, done) =>
    gulp.start(runSequence('sprites', 'styles', reload), done)
  ));

  // Styles
  $.watch(['app/styles/less/**/*.less'], $.batch((events, done) =>
    gulp.start(runSequence('styles', reload), done)
  ));

  // Templates
  $.watch(['app/templates/**/*'], $.batch((events, done) =>
    gulp.start(runSequence('templates', reload), done)
  ));

  // Bower
  $.watch(['bower.json'], $.batch((events, done) =>
    gulp.start(runSequence(['sync:bower', 'templates'], reload), done)
  ));
});

// Build and runs the server
gulp.task('server', ['build:default'], () =>
  browserSync({
    notify: false,
    logPrefix: 'Yellfy',
    server: ['build'],
    port: 8001
  })
);

// General building tasks
gulp.task('default', (cb) => runSequence('build:default', 'serve', cb));
gulp.task('build', () =>
  runSequence('build:default', 'compress', () => del(['.tmp'], { dot: true })
));
