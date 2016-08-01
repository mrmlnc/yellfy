'use strict';

const $ = use('syncy');

const files = [
  'app/fonts/**',
  'app/images/**/*.{gif,jpg,png,svg}',
  'app/{scripts,styles}/vendor/**',
  'app/*'
];

// When you synchronize directories compiled files should not be deleted.
const ignoreInDest = [
  'styles/*.{css,map}',
  'scripts/*.{js,map}',
  '*.html'
];

function task() {
  return $.syncy(files, 'build', { base: 'app', ignoreInDest });
}

module.exports = {
  task
};
