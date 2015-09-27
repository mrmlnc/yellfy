module.exports = {
  options: {
    loose: 'all'
  },
  main: {
    files: {
      'build/scripts/scripts.bundle.js': 'build/scripts/scripts.bundle.es6.js'
    }
  }
};
