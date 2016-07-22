'use strict';

const { Use } = require('yellfy-use');

global.use = new Use({
  gulp: require('gulp'),
  helperDir: './gulp/helpers'
}).use;

require('./gulp/yellfy/bootstrap');
