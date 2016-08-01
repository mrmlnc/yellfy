'use strict';

const $ = use('stylelint');

function task(done) {
  const config = require('../config/stylelint');

  $.stylelint.lint({
    config,
    files: 'app/styles/**/*.less',
    formatter: 'string',
    syntax: 'less'
  }).then((lint) => {
    if (lint.errored) {
      console.log(lint.output);
      done(`Linting styles failed with errors in ${lint.results.length} files.`);
    } else {
      done();
    }
  }).catch((err) => {
    done(err.stack);
  });
}

module.exports = {
  task
};
