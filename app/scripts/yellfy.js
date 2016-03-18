'use strict';

(() => {
  fetch('https://api.github.com/repos/mrmlnc/yellfy/tags', { method: 'GET' })
    .then((res) => res.json())
    .then((tags) => {
      console.log(`The latest version of Yellfy — ${tags[0].name}!`);
    })
    .catch((err) => {
      throw new Error(err);
    });
})();
