module.exports = {
  options: {
    assetsDir: ['app/styles/inline', 'app/scripts/inline']
  },
  all: {
    files: [{
      expand: true,
      cwd: 'build',
      src: '*.html',
      dest: 'build'
    }]
  }
};
