module.exports = {
  main: [
    'app/scripts/**/*.js',
    '!app/scripts/{inline,vendor}/**'
  ],
  inline: ['app/scripts/inline/**/*.js']
};
