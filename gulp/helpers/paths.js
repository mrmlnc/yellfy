'use strict';

function getProjectRoot() {
  return slash(process.cwd() + '/');
}

function removeProjectRoot(str) {
  const cwd = getProjectRoot();
  const cwdRegExp = new RegExp(escapeRegExp(cwd), 'g');

  return slash(str).replace(cwdRegExp, '');
}

function slash(str) {
  return str.replace(/\\/g, '/');
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

module.exports = {
  getProjectRoot,
  removeProjectRoot,
  slash,
  escapeRegExp
};
