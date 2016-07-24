'use strict';

const $ = use(
  'chalk',
  'rollup',
  'rollup-plugin-babel',
  'babel-preset-es2015-rollup'
);

const { paths, logger } = $._;

// Cache for incremental rebuilds
let bundleCache;

function errorHandler(err) {
  err.message = paths.removeProjectRoot(err.message).replace(/.*:\s+app\//, 'app/');

  logger.error(err.toString());

  err.codeFrame.split('\n').forEach(logger.error);
}

function task() {
  return $.rollup.rollup({
    entry: './app/scripts/scripts.js',
    plugins: [$.rollupPluginBabel({
      babelrc: false,
      presets: ['es2015-rollup']
    })],
    cache: bundleCache
  }).then((bundle) => {
    bundleCache = bundle;
    return bundle.write({
      sourceMap: true,
      format: 'iife',
      dest: 'build/scripts/scripts.bundle.js'
    });
  }).catch(errorHandler);
}

module.exports = {
  task
};
