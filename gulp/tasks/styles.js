'use strict';

const $ = use(
  'gulp-sourcemaps',
  'gulp-less',
  'less-plugin-glob',
  'gulp-postcss',
  'postcss-flexbugs-fixes as flexbugs',
  'autoprefixer'
);

const { paths, logger } = $.helpers;

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

function task() {
  return $.gulp.src('app/styles/less/styles.less')
    .pipe($.sourcemaps.init())
    .pipe($.less({
      plugins: [$.lessPluginGlob]
    }).on('error', lessErrorHandler))
    .pipe($.postcss([
      $.flexbugs,
      $.autoprefixer({ browsers: autoprefixerConfig })
    ]))
    .pipe($.sourcemaps.write('.'))
    .pipe($.gulp.dest('build/styles'));
}

module.exports = {
  task
};
