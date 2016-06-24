'use strict';

import { getJSON } from './modules/request';

getJSON('https://api.github.com/repos/mrmlnc/yellfy/tags')
  .then((tags) => {
    console.info(`The latest version of Yellfy — ${tags[0].name}!`);
  })
  .catch((err) => {
    throw new Error(err);
  });
