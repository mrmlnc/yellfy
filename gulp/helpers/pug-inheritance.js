'use strict';

const path = require('path');
const fs = require('fs');

function normalizePath(filepath, context) {
  if (context && path.dirname(filepath) === '.') {
    return path.join(context, filepath).replace(/\\/g, '/');
  }

  return filepath;
}

function getPaths(source) {
  const match = source.match(/^\s*(include|extends)\s(.*)/gm);

  if (match) {
    return match.map((match) => {
      const fullpath = match.replace(/\s*(include|extends)./g, '') + '.pug';
      return fullpath.replace(/[\.\.\\\/]*/, '');
    });
  }

  return null;
}

function getPages() {
  return fs.readdirSync('app/templates').filter((filepath) => /pug$/.test(filepath));
}

function getPage(name) {
  const filepath = path.join('app/templates', name);

  try {
    return fs.readFileSync(filepath).toString();
  } catch (err) {
    return false;
  }
}

function calculateTree(target, context, tree) {
  const page = getPage(target);
  if (!page) {
    return tree;
  }

  let paths = getPaths(page);

  if (!paths) {
    return tree;
  }

  paths = paths.map((filepath) => normalizePath(filepath, path.dirname(target)));
  paths.forEach((filepath) => {
    tree = calculateTree(filepath, path.dirname(target), tree);
  });

  return tree.concat(paths);
}

function getPathsTree() {
  const cacheTree = [];
  getPages().forEach((page) => {
    cacheTree[page] = calculateTree(page, null, [page]);
  });

  return cacheTree;
}

module.exports.getPathsTree = getPathsTree;
