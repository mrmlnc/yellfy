/**
 *
 * Raptorius Web Kit
 * --
 * Template for your new web application.
 *
 * @verison: 0.6.1
 * @license: MIT
 * @author: Denis Malinochkin
 *
 */

'use strict';

// Grunt configuration
module.exports = function(grunt) {
  var path = require('path');

  // Time evaluation && loading Grunt tasks
  require('time-grunt')(grunt);

  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'config/plugins'),

    jitGrunt: {
      customTasksDir: 'config/tasks',
      staticMappings: {
        htmlhintplus: 'grunt-htmlhint-plus'
      }
    }
  });

};
