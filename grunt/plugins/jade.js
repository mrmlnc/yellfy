var path = require('path');
var grunt = require('grunt');

var loadJsonData = function(dirpath) {
  dirpath = path.join(process.cwd(), dirpath);
  var list = grunt.file.expand({
    filter: 'isFile',
    nonull: true,
    cwd: dirpath
  }, '*.json');

  return list.forEach(function(filename) {
    var name = path.basename(filename, '.json');
    this[name] = grunt.file.readJSON(path.join(dirpath, filename));
  });
};

var jadeTask = function() {
  return {
    options: {
      pretty: true,
      data: function() {
        return loadJsonData('app/templates/data');
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

module.exports = jadeTask;
