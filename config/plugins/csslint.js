/**
 * ## grunt-contrib-csslint
 * Lint CSS and LESS
 *
 */

module.exports = {

  options: {
    csslintrc: 'config/.csslintrc'
  },
  dist: [
    'build/styles/**/*.css',
    '!build/styles/vendor/**'
  ]

};
