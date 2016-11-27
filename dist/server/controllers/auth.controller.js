'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _oauth = require('oauth');

var _oauth2 = _interopRequireDefault(_oauth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../../config/env');
var consumer = new _oauth2.default.OAuth("https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token", config.auth.twitter.CONSUMER_KEY, config.auth.twitter.CONSUMER_SECRET, "1.0A", 'http://127.0.0.1:' + config.port + '/api/auth/token', "HMAC-SHA1");

var getToken = function getToken(req, res, next) {
  consumer.getOAuthRequestToken(function (error, oauthToken, oauthTokenSecret, results) {
    if (error) {
      var err = new _APIError2.default('Authentication error', _httpStatus2.default.UNAUTHORIZED);
      return next(err);
    } else {
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      return res.json({
        session: req.session,
        status: {
          'message': 'OK',
          'code': _httpStatus2.default.OK
        }
      });
    }
  });
};

exports.default = { getToken: getToken };
module.exports = exports['default'];
//# sourceMappingURL=auth.controller.js.map
