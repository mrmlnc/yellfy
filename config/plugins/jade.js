/**
 * ## grunt-contrib-jade
 * Compile Jade templates
 *
 */

module.exports = {

  options: {
    pretty: true,
    data: function(dest, src) {
      return require('require-all')({
        dirname:  __dirname + '../../../app/templates/data',
        filter: /(.+)\.json$/
      });
    }
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
