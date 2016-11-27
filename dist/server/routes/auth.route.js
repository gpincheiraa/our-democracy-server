'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _paramValidation = require('../../config/param-validation');

var _paramValidation2 = _interopRequireDefault(_paramValidation);

var _auth = require('../controllers/auth.controller');

var _auth2 = _interopRequireDefault(_auth);

var _env = require('../../config/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

/** POST /api/auth/token - Returns token if authentication success */
router.route('/token').get(_auth2.default.getToken);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=auth.route.js.map
