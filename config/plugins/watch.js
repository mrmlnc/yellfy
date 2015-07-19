/**
 * ## grunt-contrib-watch
 * Watch files and run tasks
 *
 */

module.exports = {

  options: {
    spawn: false,
    livereload: true
  },

  // Synchronize directory
  sync: {
    files: [
      'app/*',
      'app/fonts/**',
      'app/images/**',
      'app/styles/vendor/**',
      'app/scripts/vendor/**'
    ],
    tasks: ['sync']
  },

  // HTML files and Bower components
  html: {
    files: ['app/templates/**'],
    tasks: ['jade', 'htmlhintplus', 'wiredep']
  },

  bower: {
    files: ['bower.json'],
    tasks: ['wiredep']
  },

  // Styles
  styles: {
    files: ['app/styles/less/**'],
    tasks: ['less:development', 'csslint']
  },

  // Scripts
  scripts: {
    files: ['app/scripts/**'],
    tasks: ['jshint', 'jscs', 'concat']
  }

};
