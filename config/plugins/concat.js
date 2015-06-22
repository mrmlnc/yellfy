/**
 * ## grunt-contrib-concat
 * Concatenate files
 *
 */

module.exports = {

  main: {
    src: [
      'app/scripts/**/*.js',
      '!app/scripts/vendor/**'
    ],
    dest: 'build/scripts/scripts.js',
    nonull: true
  }

};
