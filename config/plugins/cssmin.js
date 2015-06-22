/**
 * ## grunt-contrib-cssmin
 * Compress CSS files
 *
 */

module.exports = {

  main: {
    files: {
      'build/styles/styles.min.css': 'build/styles/styles.css',
      'build/styles/styles-cmq.min.css': 'build/styles/styles-cmq.css'
    }
  }

};
