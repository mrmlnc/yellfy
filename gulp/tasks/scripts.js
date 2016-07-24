'use strict';

const $ = use(
  'chalk',
  'rollup',
  'rollup-plugin-babel',
  'babel-preset-es2015-rollup'
);

// Cache for incremental rebuilds
let bundleCache;

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
  }).catch($._.logger.error);
}

module.exports = {
  task
};
