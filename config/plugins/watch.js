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
      'app/**',
      '!app/styles/**',
      'app/styles/vendor/**'
    ],
    tasks: ['sync']
  },

  // HTML files and Bower components
  html: {
    files: ['app/templates/**'],
    tasks: ['html']
  },

  bower: {
    files: ['bower.json'],
    tasks: ['wiredep']
  },

  // Styles
  styles_less: {
    files: ['app/styles/less/**'],
    tasks: ['less:development', 'csslint:less']
  },

  // Scripts
  scripts: {
    files: ['app/scripts/**', '!app/scripts/vendor/**'],
    tasks: ['jshint', 'jscs', 'concat']
  },

  // Inline files
  inline_styles: {
    files: ['app/styles/inline/**'],
    tasks: ['csslint:inline', 'html']
  },

  inline_scripts: {
    files: ['app/scripts/inline/**'],
    tasks: ['html']
  }

};
