'use strict';

const assert = chai.assert;

describe('Testing approval', () => {
  it('True is True?', () => {
    assert.equal(true, true);
  });

  it('False is False?', () => {
    assert.equal(false, false);
  });
});

describe('DOM', () => {
  it('The element `body` must include five scripts', () => {
    assert.equal(document.querySelectorAll('script').length, 5);
  });
});
