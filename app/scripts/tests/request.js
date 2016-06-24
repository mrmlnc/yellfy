'use strict';

import assert from 'assert';
import { getJSON } from '../modules/request';

describe('Request', function() {
  it('Should return a semver version', () => {
    return getJSON('https://api.github.com/repos/mrmlnc/yellfy/tags')
      .then((tags) => {
        assert.ok(/\d+\.\d+\.\d+/.test(tags[0].name));
      });
  });

  it('Should throw error if JSON broken', () => {
    return getJSON('https://throw-error.com')
      .catch((err) => {
        assert.ok(err);
      });
  });
});
