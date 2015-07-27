/**
 * ## grunt-contrib-csslint
 * Lint CSS and LESS
 *
 */

module.exports = {

  options: {
    csslintrc: 'config/.csslintrc'
  },

  less: {
    dist: [
      'build/styles/**/*.css',
      '!build/styles/vendor/**'
    ]
  },

  inline: {
    dist: ['app/styles/inline/**/*.css']
  }

};
