/**
 * ## grunt-contrib-jade
 * Compile Jade templates
 *
 */

module.exports = {

  options: {
    pretty: true,
    data: function(dest, src) {
      var fs = require('fs');
      var path = require('path');
      var dir = path.join(process.cwd(), 'app/templates/data');
      var dirList = fs.readdirSync(dir);
      var data = {};
      dirList.forEach(function(filename) {
        var fileBaseName = path.basename(filename);
        var objKey = fileBaseName.replace('.json', '');
        if (path.extname(filename) === '.json') {
          var fileData = fs.readFileSync(path.join(dir, fileBaseName));
          data[objKey] = JSON.parse(fileData);
        }
      });

      return data;
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
