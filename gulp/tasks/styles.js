'use strict';

const $ = use(
  'chalk',
  'gulp-sourcemaps',
  'gulp-less',
  'less-plugin-glob',
  'gulp-postcss',
  'autoprefixer'
);

const { paths, logger, errorHandler } = $._;

const autoprefixerConfig = [
  // Microsoft
  'Explorer >= 10',
  'Edge >= 12',
  'ExplorerMobile >= 10',
  // Mozilla
  'Firefox >= 30',
  // Google
  'Chrome >= 34',
  'Android >= 4',
  // Opera
  'Opera >= 12',
  // Apple
  'Safari >= 7',
  'iOS >= 7',
  // BlackBerry
  'BlackBerry >= 10'
];

function lessErrorHandler(err) {
  err.message = paths.removeProjectRoot(err.message);
  err.message = `${err.type}Error: ${err.message}`;

  logger.error(err.message);

  err.extract.forEach((line, index) => {
    index = index + err.line - 1;
    if (index === err.line) {
      line = `> ${index}| ${line}`;
    } else {
      line = `  ${index}| ${line}`;
    }

    logger.error(line);
  });
}

function task(done) {
  return $.gulp.src('app/styles/less/styles.less')
    .pipe($.sourcemaps.init())
    .pipe($.less({
      plugins: [$.lessPluginGlob]
    }).on('error', function(err) {
      errorHandler(err, this, done, lessErrorHandler);
    }))
    .pipe($.postcss([
      $.autoprefixer({ browsers: autoprefixerConfig })
    ]))
    .pipe($.sourcemaps.write('.'))
    .pipe($.gulp.dest('build/styles'));
}

module.exports = {
  task
};
