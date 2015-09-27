module.exports = {
  options: {
    nonull: true,
    sourceMap: true
  },
  main: {
    src: [
      'app/scripts/**/*.js',
      '!app/scripts/vendor/**'
    ],
    dest: 'build/scripts/scripts.bundle.es6.js'
  }
};
