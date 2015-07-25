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
    middleware : function(connect) {
      return [
        connect().use(
          '/bower_components',
          connect.static('./bower_components')
        ),
        connect.static('./app/styles'),
        connect.static('./build')
      ];
    }
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
