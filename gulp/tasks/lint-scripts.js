'use strict';

const $ = use('xo');

function task(done) {
  $.xo.lintFiles(['app/scripts/**/*.js', '!app/scripts/vendor/**']).then((report) => {
    const output = $.xo.getFormatter('stylish')(report.results);
    if (output) {
      console.log(output);
    }

    if (report.errorCount > 0) {
      done(`Linting scripts failed with ${report.errorCount} errors.`);
    } else {
      done();
    }
  });
}

module.exports = {
  task
};
