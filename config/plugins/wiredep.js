module.exports = function(grunt) {
  return {
    main: {
      ignorePath: /^\/|\.\.\/bower_components\//,
      src: ['build/*.html'],
      onError: function(err) {
        if (err.code === 'BOWER_COMPONENTS_MISSING') {
          grunt.log.error('Warning: Cannot find where you keep your Bower packages.');
        }
      }
    }
  };
};
