var scriptsTask = function(grunt) {
  grunt.task.registerTask('scripts', function(mode) {
    mode = typeof mode === 'undefined' ? 'dev' : 'prod';
    grunt.task.run([
      'xo:main',
      'concat',
      'babel'
    ]);

    if (mode === 'prod') {
      grunt.task.run('uglify');
    }
  });
};

module.exports = scriptsTask;
