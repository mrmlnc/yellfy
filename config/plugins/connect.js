/**
 * ## grunt-contrib-connect
 * Start a static web server
 *
 */

module.exports = {

  options: {
    hostname: '*',
    open: true,
    livereload: true,
    base: [
      'bower_components',
      'app/styles',
      'build'
    ]
  },

  development: {
    port: 8000
  },

  server: {
    options: {
      port: 80
    }
  }

};
