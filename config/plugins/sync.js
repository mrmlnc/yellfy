/**
 * ## grunt-sync
 * Synchronize APP directory and BUILD
 *
 */

module.exports = {

  main: {
    files: [{
      cwd: 'app/',
      src: [
        '**',
        '!styles/**',
        'styles/vendor/**',
        '!scripts/**',
        'scripts/vendor/**',
        '!templates/**'
      ],
      dest: 'build/'
    }],
    ignoreInDest: [
      'styles/*.{css,map}',
      'scripts/*.js',
      '*.html'
    ],
    updateAndDelete: true
  }

};
