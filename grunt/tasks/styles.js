var stylesTask = function(grunt) {
  grunt.task.registerTask('styles', function(mode) {
    mode = typeof mode === 'undefined' ? 'dev' : 'prod';
    grunt.task.run([
      'less'
    ]);

    if (mode === 'prod') {
      grunt.task.run(['cssmin']);
    }
  });
};

module.exports = stylesTask;
