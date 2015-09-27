var installTask = function (grunt) {
  grunt.registerTask('install', function() {
    var vendorDirs = [
      'app/fonts/',
      'app/images/icons/',
      'app/scripts/vendor/',
      'app/scripts/inline',
      'app/styles/vendor/',
      'app/styles/inline'
    ];

    vendorDirs.forEach(function(dir) {
      if (!grunt.file.exists(dir)) {
        grunt.file.mkdir(dir);
      }
    });

    grunt.log.ok('The project is now ready for use!');
  });
};

module.exports = installTask;
