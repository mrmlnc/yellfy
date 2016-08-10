'use strict';

const $ = use('gulp-svg-sprite');

function task() {
  const options = {
    log: true,
    mode: {
      defs: {
        dest: '.',
        sprite: 'images/sprite.svg',
        inline: true,
        // Make mixin
        prefix: '.svg-%s',
        dimensions: '()'
      }
    }
  };

  return $.gulp.src('app/images/icons/**/*.svg')
    .pipe($.svgSprite(options))
    .pipe($.gulp.dest('build'));
}

module.exports = {
  task
};
