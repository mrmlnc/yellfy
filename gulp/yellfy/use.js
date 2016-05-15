'use strict';

const fs = require('fs');
const camelCase = require('camelcase');

function getPackageDeps() {
  const pkgFile = fs.readFileSync('./package.json');
  return Object.keys(JSON.parse(pkgFile).devDependencies);
}

function renamePlugin(name) {
  return camelCase(name.replace(/^gulp(-|\.)/, ''));
}

global.needDeps = [];
global.use = function() {
  const pkgDeps = getPackageDeps();
  const taskDeps = Array.from(arguments);
  const needDeps = taskDeps.filter((dependName) => {
    return (pkgDeps.indexOf(dependName) === -1);
  });

  if (needDeps.length) {
    global.needDeps = global.needDeps.concat(needDeps);
    return;
  }

  const deps = { gulp: require('gulp') };
  taskDeps.forEach((dependName) => {
    deps[renamePlugin(dependName)] = require(dependName);
  });

  return deps;
};
