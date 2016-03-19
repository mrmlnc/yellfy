const jsdom = require('jsdom');
const assert = require('assert');

describe('Yellfy script', () => {
  it('Fetch API', (done) => {
    const myConsole = jsdom.createVirtualConsole();
    myConsole.on('log', function(msg) {
      assert.equal(msg, 'The latest version of Yellfy — 1.0.0-a!');
      done();
    });

    jsdom.env({
      html: '<!DOCTYPE html><html><head><title></title></head><body></body></html>',
      scripts: [
        'https://cdnjs.cloudflare.com/ajax/libs/fetch/0.11.0/fetch.min.js',
        'app/scripts/yellfy.js'
      ],
      virtualConsole: myConsole,
      done: function(err) {
        if (err) {
          throw new Error(err);
        }
      }
    });
  });
});
