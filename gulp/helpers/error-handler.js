'use strict';

const beeper = require('beeper');
const exit = process.exit;

/**
 * Helper for error handling
 *
 * @param {Error} err
 * @param {Object} context
 * @param {Function} done
 * @param {Function=} cb
 */
function handler(err, context, done, cb) {
  if (cb) {
    cb(err);
  }

  if (!global.watch) {
    exit(1);
  }

  beeper();
  context.emit('end');
}

module.exports = handler;
