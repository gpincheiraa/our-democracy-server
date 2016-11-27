'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('./auth.route');

var _auth2 = _interopRequireDefault(_auth);

var _search = require('./search.route');

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/** GET /health-check - Check service health */
router.get('/health-check', function (req, res) {
  return res.send('OK');
});

// mount routes
router.use('/auth', _auth2.default);
router.use('/search', _search2.default);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=index.route.js.map
