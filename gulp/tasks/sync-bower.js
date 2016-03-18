'use strict';

const path = require('path');
const fs = require('fs');
const $ = use();

function task(done) {
  const raw = fs.readFileSync(path.join('.', 'bower.json'));
  const json = JSON.parse(raw);
  const bowerDeps = Object.keys(json.dependencies).map((filepath) => {
    return path.join('bower_components', filepath, '/');
  });

  if (!bowerDeps.length) {
    return done();
  }

  return $.gulp.src(bowerDeps, { read: false })
    .pipe($.gulp.symlink('build/bower_components'));
}

module.exports = {
  task
};
