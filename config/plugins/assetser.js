/**
 * ## grunt-contrib-clean
 * Clean files and folders
 *
 */

module.exports = {

  options: {
    assetsDir: ['app/styles/inline', 'app/scripts/inline']
  },
  main: {
    files: [{
      expand: true,
      cwd: 'build',
      src: '*.html',
      dest: 'build'
    }]
  }

};
