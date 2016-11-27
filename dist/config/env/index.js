'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV || 'development';
var config = require('./' + env); // eslint-disable-line import/no-dynamic-require

var defaults = {
  root: _path2.default.join(__dirname, '/..'),
  auth: {
    twitter: {
      CONSUMER_KEY: 'bO4vqoJpmtxN6um768i6rtCyp',
      CONSUMER_SECRET: 'AZyIk8vtllzjFa9FSKjVBK5UkoNP6grt396HlOBipzF4Tfvmxh',
      CALLBACK: '/auth/login'
    },
    monkeyLearn: {
      TOKEN: '7dab97263e34812fd0b317e32c8fb2f0196448ba',
      MODULE_ID: 'cl_u9PRHNzf'
    }
  }
};

exports.default = Object.assign(defaults, config);
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
