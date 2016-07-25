'use strict';

const $ = use('xo');

function task(done) {
  $.xo.lintFiles(['app/scripts/**/*.js', '!app/scripts/vendor/**']).then((report) => {
    const output = $.xo.getFormatter('stylish')(report.results);
    if (output) {
      console.log(output);
    }

    if (report.errorCount > 0) {
      $._.errorHandler('error', this, done);
    } else {
      done();
    }
  });
}

module.exports = {
  task
};
