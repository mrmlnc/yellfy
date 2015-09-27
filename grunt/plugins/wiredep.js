var grunt = require('grunt');

var errorhandler = function(code) {
  if (code === 'BOWER_COMPONENTS_MISSING') {
    grunt.log.error('Warning: Cannot find where you keep your Bower packages.');
  }
};

var wiredepTask = function(grunt) {
  return {
    main: {
      ignorePath: /^\/|\.\.\/bower_components\//,
      src: ['build/*.html'],
      onError: function(err) {
        errorhandler(err.code);
      }
    }
  };
};

module.exports = wiredepTask;
