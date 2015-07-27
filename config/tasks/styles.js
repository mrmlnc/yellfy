/**
 * ## task-styles
 *
 */

module.exports = function (grunt) {

  grunt.registerTask('styles', function(status) {
    status = typeof status !== 'undefined' ? status : 'development';
    if (status === 'production') {
      grunt.task.run(['clean:styles']);
    }

    grunt.task.run(['less:' + status, 'csslint:less']);

    if (status === 'production') {
      grunt.task.run(['csslint:inline', 'combine_mq', 'cssmin']);
    }
  });

};
