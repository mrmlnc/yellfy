module.exports = {
  main: {
    files: [{
      cwd: 'app/',
      src: [
        'images/**',
        'scripts/vendor/**',
        'styles/vendor/**',
        '*'
      ],
      dest: 'build/'
    }],
    ignoreInDest: [
      'styles/*.{css,map}',
      'scripts/*.{js,map}',
      '*.html'
    ],
    updateAndDelete: true
  }
};
