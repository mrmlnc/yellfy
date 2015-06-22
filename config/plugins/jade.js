/**
 * ## grunt-contrib-jade
 * Compile Jade templates
 *
 */

module.exports = {

  options: {
    pretty: true
  },

  main: {
    files: [{
      expand: true,
      cwd: 'app/templates',
      ext: '.html',
      src: ['*.jade'],
      dest: 'build/'
    }]
  }

};
