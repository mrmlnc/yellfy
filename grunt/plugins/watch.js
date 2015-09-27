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
      'app/styles/vendor/**',
      'app/scripts/vendor/**'
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
    files: ['app/scripts/**'],
    tasks: ['scripts']
  },

  // Inline files
  inline_styles: {
    files: ['app/styles/inline/**'],
    tasks: ['html']
  },

  inline_scripts: {
    files: ['app/scripts/inline/**'],
    tasks: ['html']
  }
};
