module.exports = {
  main: {
    files: [{
      expand: true,
      cwd: 'build/scripts',
      src: [
        '**/*.js',
        '!**/*.es6.js',
        '!vendor/**'
      ],
      ext: '.bundle.min.js',
      dest: 'build/scripts'
    }]
 }
};
