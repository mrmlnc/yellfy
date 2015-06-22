/**
 * ## task-scripts
 *
 */

module.exports = function (grunt) {

  grunt.registerTask('scripts', function(status) {
    status = typeof status !== 'undefined' ? status : 'development';
    if (status === 'production') {
      grunt.task.run(['clean:scripts', 'jshint', 'jscs']);
    }

    grunt.task.run(['concat']);

    if (status === 'production') {
      grunt.task.run(['uglify']);
    }
  });

};
