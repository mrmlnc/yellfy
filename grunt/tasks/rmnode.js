var fs = require('fs');

var recursiveDeleteFolder = function(filepath) {
  if (fs.existsSync(filepath)) {
    var files = fs.readdirSync(filepath);
    files.forEach(function(filename) {
      var curPath = filepath + '/' + filename;
      if (fs.lstatSync(curPath).isDirectory()) {
        recursiveDeleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(filepath);
  }
};

var rmnodeTask = function (grunt) {
  grunt.registerTask('rmnode', function() {
    recursiveDeleteFolder('node_modules/');
    grunt.log.ok('Finale!');
  });
};

module.exports = rmnodeTask;
