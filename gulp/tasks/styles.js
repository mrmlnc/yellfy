'use strict';

const $ = use(
  'chalk',
  'slash',
  'gulp-sourcemaps',
  'gulp-less',
  'less-plugin-glob',
  'gulp-postcss',
  'autoprefixer'
);

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

function replacePaths(str, chunk, newChunk) {
  const pattern = chunk.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  return str.replace(new RegExp(pattern, 'g'), newChunk);
}

function lessErrorHandler(err) {
  err.filename = $.slash(replacePaths(err.filename, process.cwd() + '\\', ''));
  err.message = `${err.type}Error: ${err.filename} ${err.line}:${err.column}`;
  console.log($.chalk.red('>> ') + err.message);

  err.extract.forEach((line, index) => {
    index = index + err.line - 1;
    if (index === err.line) {
      line = $.chalk.red('>>') + `   > ${index}| ${line}`;
    } else {
      line = $.chalk.red('>>') + `     ${index}| ${line}`;
    }

    console.log(line);
  });

  this.emit('end');
}

function task() {
  return $.gulp.src('app/styles/less/styles.less')
    .pipe($.sourcemaps.init())
    .pipe($.less({
      plugins: [$.lessPluginGlob]
    }).on('error', lessErrorHandler))
    .pipe($.postcss([
      $.autoprefixer({ browsers: autoprefixerConfig })
    ]))
    .pipe($.sourcemaps.write('.'))
    .pipe($.gulp.dest('build/styles'));
}

module.exports = {
  task
};
