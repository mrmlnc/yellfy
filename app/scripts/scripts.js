'use strict';

import request from './modules/request';

request.getVersion('https://api.github.com/repos/mrmlnc/yellfy/tags', {
  method: 'GET'
});
