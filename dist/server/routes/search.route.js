'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _search = require('../controllers/search.controller');

var _search2 = _interopRequireDefault(_search);

var _env = require('../../config/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

/** POST /api/search/:something - Do search on twitter an process by monkeyLearn controller */
router.route('/:q').get(_search2.default.search);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=search.route.js.map
