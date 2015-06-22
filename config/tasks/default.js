/**
 * ## task-default
 *
 */

module.exports = function (grunt) {

  grunt.registerTask('default', [
    'concurrent:compileDev',
    'connect:development',
    'notify:run',
    'watch'
  ]);

};
