'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../config/env/index');

var _index2 = _interopRequireDefault(_index);

var _express = require('../config/express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_express2.default.listen(_index2.default.port, function () {
  console.log('Server started on port ' + _index2.default.port + ' (' + _index2.default.env + ')');
});

exports.default = _express2.default;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
