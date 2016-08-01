'use strict';

const $ = use(
  'rollup',
  'rollup-plugin-babel as babel'
);

const { paths, logger } = $.helpers;

// Cache for incremental rebuilds
let bundleCache = null;

function rollupErrorHandler(err) {
  err.message = paths.removeProjectRoot(err.message).replace(/.*:\s+app\//, 'app/');

  logger.error(err.toString());

  if (err.codeFrame) {
    err.codeFrame.split('\n').forEach(logger.error);
  }
}

function task() {
  const rollupOptions = {
    entry: './app/scripts/scripts.js',
    plugins: [$.babel({
      babelrc: false,
      presets: ['es2015-rollup']
    })],
    cache: bundleCache
  };

  return $.rollup.rollup(rollupOptions).then((bundle) => {
    bundleCache = bundle;
    return bundle.write({
      sourceMap: true,
      format: 'iife',
      dest: 'build/scripts/scripts.bundle.js'
    });
  }).catch(rollupErrorHandler);
}

module.exports = {
  task
};
