/**
 * ## task-postinstall
 *
 */

module.exports = function (grunt) {

  grunt.registerTask('postinstall', function() {
    var vendorDirs = [
      'app/fonts/',
      'app/images/icons/',
      'app/scripts/vendor/',
      'app/styles/vendor/'
    ];

    vendorDirs.forEach(function(dir) {
      if (!grunt.file.exists(dir)) {
        grunt.file.mkdir(dir);
      }
    });

    grunt.log.ok('The project is now ready for use!');
  });

};
