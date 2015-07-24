/**
 * ## grunt-contrib-clean
 * Clean files and folders
 *
 */

module.exports = {

  options: {
    onlyMarked: true,
    assetsDir: ['build/styles', 'build/scripts']
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
