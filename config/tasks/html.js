/**
 * ## task-html
 *
 */

module.exports = function (grunt) {

  grunt.registerTask('html', function(status) {
    status = typeof status !== 'undefined' ? status : 'development';
    if (status === 'production') {
      grunt.task.run(['clean:html']);
    }

    grunt.task.run(['jade', 'htmlhintplus', 'wiredep', 'assetser']);
  });

};
