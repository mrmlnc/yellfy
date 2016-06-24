'use strict';

function request(url, mode, options) {
  return fetch(url, Object.assign({ mode }, options));
}

function getJSON(url, options) {
  return request(url, 'get', options).then((res) => res.json());
}

export {
  getJSON
};
