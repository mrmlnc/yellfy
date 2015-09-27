var buildTask = function(grunt) {
  grunt.task.registerTask('build', function() {
    grunt.task.run(['clean:build', 'concurrent:prodBuild']);
  });
};

module.exports = buildTask;
