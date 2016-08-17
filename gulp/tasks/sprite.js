'use strict';

const $ = use('yellfy-svg-sprite as svgSprite');

function task() {
  const options = {
    inline: true,
    iconPrefix: 'icon-'
  };

  return $.svgSprite.makeSprite('app/images/icons', [], options).then((result) => {
    return result.write('build/images/sprite.svg');
  });
}

module.exports = {
  task
};
