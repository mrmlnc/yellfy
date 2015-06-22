/**
 * ## grunt-contrib-uglify
 * Minify files with UglifyJS
 *
 */

module.exports = {

  main: {
    files: {
      'build/scripts/scripts.min.js': ['build/scripts/scripts.js']
    }
  }

};
