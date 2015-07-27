/**
 * ## grunt-contrib-uglify
 * Minify files with UglifyJS
 *
 */

module.exports = {

  main: {
    files: [{
      expand: true,
      cwd: 'build/scripts',
      src: ['**/*.js', '!vendor/**'],
      ext: '.min.js',
      dest: 'build/scripts'
    }]
  }

};
