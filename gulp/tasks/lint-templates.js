'use strict';

const $ = use('chalk', 'text-table', 'pug-lint');

const { paths } = $.helpers;

function formatPugLintReport(item) {
  // Drop newline symbol in error string
  item.msg = (Array.isArray(item.msg) ? item.msg.join(' ') : item.msg).replace('\n', '');
  // Using zero instead of undefined
  item.column = (item.column === undefined) ? 0 : item.column;
  // Drop `PUG:LINT_` prefix in error code
  item.code = item.code.replace(/(PUG:|LINT_)/g, '');

  return ['', `${item.line}:${item.column}`, item.msg, `[${item.code}]`];
}

function pugLintReporter(block) {
  let blockName;
  let output = [];

  if (block.length) {
    blockName = block[0].filename;
    output = block.map((item) => formatPugLintReport(item));
  } else {
    blockName = block.filename;
    output.push(formatPugLintReport(block));
  }

  console.log('\n' + $.chalk.underline(blockName));
  console.log($.textTable(output));
}

function task(done) {
  const config = require('../config/puglint');

  const PugLint = $.pugLint;
  const linter = new PugLint();

  linter.configure(config);

  let errorCount = 0;
  return $.gulp.src('app/templates/**/*.pug')
    .on('data', (file) => {
      const filepath = paths.removeProjectRoot(file.path);
      const report = linter.checkString(file.contents.toString(), filepath);

      if (report.length) {
        errorCount += report.length;

        pugLintReporter(report);
      }
    })
    .on('end', () => {
      if (errorCount > 0) {
        console.log('');
        done(`Linting templates failed with ${errorCount} errors.`);
      } else {
        done();
      }
    })
    .on('error', (err) => {
      done(err);
    });
}

module.exports = {
  task
};
