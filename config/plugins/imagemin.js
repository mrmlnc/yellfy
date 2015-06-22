/**
 * ## grunt-contrib-imagemin
 * Minify images
 *
 */

module.exports = {

  options: {
    progressive: true,
    interlaced: true
  },

  main: {
    files: [{
      expand: true,
      cwd: 'app/images/',
      src: ['**/*.{png,jpg,gif,svg}'],
      dest: 'build/images/'
    }]
  }

};
