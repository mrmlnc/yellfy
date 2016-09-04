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

      let errorCount = 0;
      lint.results.forEach((resource) => {
        if (resource.warnings.length || resource.errored) {
          errorCount++;
        }
      });

      done(`Linting styles failed with errors in ${errorCount} files.`);
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
