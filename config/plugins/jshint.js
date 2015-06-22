/**
 * ## grunt-contrib-jshint
 * Validate files with JSHint
 *
 */

module.exports = {

  options: {
    jshintrc: 'config/.jshintrc'
  },

  main: [
    'app/scripts/**/*.js',
    '!app/scripts/vendor/**'
  ]

};
