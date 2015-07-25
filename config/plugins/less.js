/**
 * ## grunt-contrib-less
 * Compile LESS files to CSS
 *
 */

module.exports = {

  options: {
    plugins: [
      new (require('less-plugin-autoprefix'))({
        browsers: [
          'ie >= 9',
          'ie_mob >= 10',
          'ff >= 30',
          'chrome >= 30',
          'safari >= 7',
          'opera >= 21',
          'ios >= 7',
          'android >= 4.2',
          'bb >= 10'
        ]
      }),
      new (require('less-plugin-csscomb'))('config/.csscomb.json'),
      require('less-plugin-glob')
    ]
  },

  development: {
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
  },

  production: {
    files: {
      'build/styles/styles.css': 'app/styles/less/styles.less'
    }
  }

};
