'use strict';

function getVersion(url, options) {
  fetch(url, options)
    .then((res) => res.json())
    .then((tags) => {
      console.log(`The latest version of Yellfy — ${tags[0].name}!`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export default {
  getVersion
};
