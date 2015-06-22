/**
 * ## grunt-csscomb
 * CSS coding style formatter
 *
 */

module.exports = {

  options: {
    config: 'config/.csscomb.json'
  },

  main: {
    files: {
      'build/styles/styles.css': ['build/styles/styles.css']
    }
  }

};
