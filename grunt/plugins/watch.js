module.exports = {
  options: {
    spawn: false,
    livereload: true
  },

  // Synchronization directories
  sync: {
    files: [
      'app/*',
      'app/images/**',
      'app/{styles,scripts}/vendor/**'
    ],
    tasks: ['sync']
  },

  // Templates
  bower: {
    files: ['bower.json'],
    tasks: ['concurrent:bower']
  },
  html: {
    files: ['app/templates/**'],
    tasks: ['jade', 'assetser', 'htmlhintplus']
  },

  // Styles
  styles: {
    files: ['app/styles/less/**'],
    tasks: ['styles']
  },

  // Scripts
  scripts: {
    files: ['app/scripts/!(inline|vendor)**'],
    tasks: ['scripts']
  },

  // Inline files
  inlineStyles: {
    files: ['app/styles/inline/**'],
    tasks: ['html']
  },
  inlineScripts: {
    files: ['app/scripts/inline/**'],
    tasks: ['xo:inline', 'html']
  }
};
