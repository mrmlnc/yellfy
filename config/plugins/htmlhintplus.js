/**
 * ## grunt-htmlhint-plus
 * Lint html files with htmlhint
 *
 */

module.exports = {

  options: {
    htmlhintrc: 'config/.htmlhintrc'
  },

  main: {
    src: ['build/*.html']
  }

};
