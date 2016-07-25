'use strict';

const fs = require('fs');

const $ = use('chalk', 'text-table', 'pug-lint');
const { paths } = $._;

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

  // If the passed block errors is an array
  if (block.length) {
    blockName = block[0].filename;
    output = block.map((item) => formatPugLintReport(item));
  } else {
    blockName = block.filename;
    output.push(formatPugLintReport(block));
  }

  console.log('\n', $.chalk.underline(blockName));
  console.log($.textTable(output));
}

function getPugLintConfiguration() {
  return new Promise((resolve, reject) => {
    fs.readFile('./package.json', (err, data) => {
      if (err) {
        reject(err);
      }

      try {
        const config = JSON.parse(data).pugLintConfig;
        resolve(config);
      } catch (err) {
        reject(err);
      }
    });
  });
}

function task(done) {
  const PugLint = $.pugLint;
  const linter = new PugLint();

  getPugLintConfiguration().then((config) => {
    linter.configure(config);

    let errors;
    let hasErrors = false;
    $.gulp.src('app/templates/**/*.pug')
      .on('data', (file) => {
        const filepath = paths.removeProjectRoot(file.path);
        errors = linter.checkString(file.contents.toString(), filepath);

        if (errors.length) {
          hasErrors = true;
          pugLintReporter(errors);
        }
      })
      .on('end', () => {
        if (!hasErrors) {
          return done();
        }

        console.log('');

        $._.errorHandler('error', this, done);
      });
  });
}

module.exports = {
  task
};
