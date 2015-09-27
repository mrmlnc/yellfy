var path = require('path');

var gruntConfig = function(grunt) {
  require('time-grunt')(grunt);

  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt/plugins'),

    jitGrunt: {
      customTasksDir: 'grunt/tasks',
      staticMappings: {
        bowersync: 'grunt-bower-sync',
        htmlhintplus: 'grunt-htmlhint-plus'
      }
    }
  });
};

module.exports = gruntConfig;
