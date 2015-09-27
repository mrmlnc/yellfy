module.exports = {
  options: {
    hostname: '*',
    open: true,
    livereload: true,
    base: ['app/styles', 'app/scripts', 'build']
  },
  dev: {
    port: 8000
  },
  server: {
    options: {
      port: 80
    }
  }
};
