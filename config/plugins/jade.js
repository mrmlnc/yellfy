module.exports = function(grunt) {
  var fs = require('fs');
  var path = require('path');

  function readDirFiles(dirpath) {
    var dir = path.join(process.cwd(), dirpath);
    var dirList = fs.readdirSync(dir);

    return dirList.forEach(function(filename) {
      var fileName = path.basename(filename, '.json');
      if (path.extname(filename) === '.json') {
        this[fileName] = grunt.file.readJSON(path.join(dir, filename));
      }

      grunt.log.ok(filename);
    });
  }

  return {
    options: {
      pretty: true,
      data: function() {
        return readDirFiles('app/templates/data');
      }
    },

    main: {
      files: [{
        expand: true,
        cwd: 'app/templates',
        ext: '.html',
        src: ['*.jade'],
        dest: 'build/'
      }]
    }
  };
};
