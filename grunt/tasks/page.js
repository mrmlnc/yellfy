var path = require('path');
var grunt = require('grunt');

var replaceTags = function(content, pageName) {
  return content.replace(/\#Y\{pageName\}/g, pageName);
};

var createPage = function(pageName) {
  var files = {
    src: {
      jadeIndex: 'grunt/templates/new-page.jade',
      jadeMain: 'grunt/templates/new-page-main.jade',
      lessMain: 'grunt/templates/new-page.less'
    },
    dest: {
      jadeIndex: path.join('app/templates', pageName + '.jade'),
      jadePage: path.join('app/templates/pages', pageName, '_main.jade'),
      lessPage: path.join('app/styles/less/pages', '_' + pageName + '.less')
    }
  };

  // Get content from templates
  var jadeIndexData = grunt.file.read(files.src.jadeIndex);
  var lessMainData = grunt.file.read(files.src.lessMain);

  // Jade
  grunt.file.write(files.dest.jadeIndex, replaceTags(jadeIndexData, pageName));
  grunt.file.copy(files.src.jadeMain, files.dest.jadePage);

  // Less
  grunt.file.write(files.dest.lessPage, replaceTags(lessMainData, pageName));
};

var newPage = function() {
  grunt.task.registerTask('page', function(pageName) {
    pageName = typeof pageName === 'undefined' ? 'new' : pageName;

    if (grunt.file.exists(path.join('app/templates', pageName + '.jade'))) {
      grunt.log.error('Page "' + pageName + '" already exists!');
    } else {
      // Create a new page (jade + less)
      createPage(pageName);
      grunt.log.ok('Page "' + pageName + '" has been successfully created!');
    }
  });
};

module.exports = newPage;
