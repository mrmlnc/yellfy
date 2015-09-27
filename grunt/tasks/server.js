var serverTask = function(grunt) {
  grunt.registerTask('server', function() {
    grunt.task.run(['build', 'connect:server', 'watch']);
  });
};

module.exports = serverTask;
