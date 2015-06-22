/**
 * ## grunt-concurrent
 * Run grunt tasks concurrently
 *
 */

module.exports = {

  compileDev: [
    'sync',
    'styles',
    'html',
    'scripts'
  ],

  compileProd: [
    'sync',
    'styles:production',
    'html:production',
    'scripts:production',
    'images'
  ]

};
