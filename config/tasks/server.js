/**
 * ## task-server
 *
 */

module.exports = function (grunt) {

  grunt.registerTask('server', [
    'build',
    'connect:server',
    'notify:run',
    'watch'
  ]);

};
