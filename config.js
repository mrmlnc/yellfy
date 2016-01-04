module.exports = {
  autoprefixer: [
    // Microsoft
    'Explorer >= 9',
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
  ],
  svgSprite: {
    log: 'info',
    shape: {
      dimension: {
        maxWidth: 32,
        maxHeight: 32
      }
    },
    mode: {
      css: {
        dest: 'styles/',
        common: 'icon',
        prefix: '.icon-',
        dimensions: '-wh',
        sprite: '../images/sprite.svg',
        bust: false,
        render: {
          less: true
        }
      }
    }
  }
};
