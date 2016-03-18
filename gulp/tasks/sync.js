'use strict';

const $ = use('chalk', 'syncy');

function task(done) {
  $.syncy([
    'app/fonts/**',
    'app/images/**/*.{gif,jpg,png,svg}',
    'app/{scripts,styles}/vendor/**',
    'app/*'
  ], 'build', {
    base: 'app',
    ignoreInDest: [
      'styles/*.{css,map}',
      'scripts/*.{js,map}',
      '*.html'
    ]
  })
    .on('error', function(err) {
      console.log($.chalk.red('>> ') + err.message);
      this.emit('end');
    })
    .on('end', done)
    .end();
}

module.exports = {
  task
};
