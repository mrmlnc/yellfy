var imagesTask = function(grunt) {
  grunt.task.registerTask('images', function() {
    grunt.task.run(['imagemin']);
  });
};

module.exports = imagesTask;
