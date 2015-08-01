/**
 * ## grunt-wiredep
 * Inject Bower dependencies right into your HTML from Grunt
 *
 */

module.exports = {

  main: {
    ignorePath: /^\/|\.\.\/bower_components\//,
    src: ['build/*.html']
  }

};
