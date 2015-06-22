/**
 * ## task-build
 *
 */

module.exports = function (grunt) {

  grunt.registerTask('build', [
    'clean:build',
    'concurrent:compileProd',
    'notify:build'
  ]);

};
