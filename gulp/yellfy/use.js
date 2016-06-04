'use strict';

const path = require('path');
const fs = require('fs');
const camelCase = require('camelcase');

function getPackageDeps() {
  const pkgFile = fs.readFileSync('./package.json');
  return Object.keys(JSON.parse(pkgFile).devDependencies);
}

function renamePlugin(name) {
  return camelCase(name.replace(/^gulp(-|\.)/, ''));
}

function getHelpers() {
  const helpers = {};
  fs.readdirSync('./gulp/helpers').forEach((helper) => {
    const name = path.basename(helper, '.js');
    helpers[camelCase(name)] = require(path.join('..', 'helpers', helper));
  });

  return helpers;
}

global.needDeps = [];
global.use = function() {
  const pkgDeps = getPackageDeps();
  const taskDeps = Array.from(arguments);
  const needDeps = taskDeps.filter((dependName) => {
    return !pkgDeps.includes(dependName);
  });

  if (needDeps.length) {
    global.needDeps = global.needDeps.concat(needDeps);
    return;
  }

  const deps = {
    gulp: require('gulp'),
    helper: getHelpers()
  };

  taskDeps.forEach((dependName) => {
    deps[renamePlugin(dependName)] = require(dependName);
  });

  return deps;
};
