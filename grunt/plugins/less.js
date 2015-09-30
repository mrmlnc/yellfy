var lessPluginGlob = require('less-plugin-glob');
var LessPluginAutoprefix = require('less-plugin-autoprefix');
var LessPluginCSScomb = require('less-plugin-csscomb');

module.exports = {
  options: {
    plugins: [
      lessPluginGlob,
      new LessPluginAutoprefix({
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 35',
          'Firefox >= 31',
          'Explorer >= 9',
          'iOS >= 7',
          'Opera >= 12',
          'Safari >= 7.1'
        ]
      }),
      new LessPluginCSScomb('grunt/.csscomb.json')
    ]
  },
  main: {
    options: {
      sourceMap: true,
      sourceMapFilename: 'build/styles/styles.css.map',
      sourceMapURL: '/styles/styles.css.map',
      sourceMapBasepath: 'app/styles',
      sourceMapRootpath: '/'
    },
    files: {
      'build/styles/styles.css': 'app/styles/less/styles.less'
    }
  }
};
