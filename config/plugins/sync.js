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
        '!styles/less/**',
        '!styles/styles.{css,map}',
        '!scripts/*',
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
