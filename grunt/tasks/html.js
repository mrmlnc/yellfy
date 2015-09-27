var htmlTask = function(grunt) {
  grunt.task.registerTask('html', function() {
    grunt.task.run([
      'jade',
      'concurrent:bower',
      'assetser',
      'htmlhintplus'
    ]);
  });
};

module.exports = htmlTask;
