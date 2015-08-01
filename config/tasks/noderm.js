/**
 * ## task-noderm
 *
 */

module.exports = function (grunt) {

  grunt.registerTask('noderm', function() {
    var fs = require('fs');

    console.log('Deleting directory `node_modules`.');

    var recursiveDeleteFolder = function(path) {
      var files = [];
      if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
          var curPath = path + "/" + file;
          if (fs.lstatSync(curPath).isDirectory()) {
            recursiveDeleteFolder(curPath);
          } else {
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(path);
      }
    };

    recursiveDeleteFolder('node_modules/');
    grunt.log.ok('Finale!');
  });

};
