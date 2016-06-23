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
    .then(() => {
      done();
    }).catch(function(err) {
      $.helper.errorHandler(err, this, done, (err) => {
        console.log($.chalk.red('>> ') + err);
      });
    });
}

module.exports = {
  task
};
