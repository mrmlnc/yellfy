var defaultTask = function(grunt) {
  grunt.task.registerTask('default', function() {
    grunt.task.run(['clean:build', 'concurrent:devBuild', 'connect:dev', 'watch']);
  });
};

module.exports = defaultTask;
