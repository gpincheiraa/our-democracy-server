'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _monkey = require('./monkey.controller');

var _monkey2 = _interopRequireDefault(_monkey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../../config/env');

var search = function search(req, res, next) {

  if (req.params.q) {

    var client = new _twitter2.default({
      consumer_key: config.auth.twitter.CONSUMER_KEY,
      consumer_secret: config.auth.twitter.CONSUMER_SECRET,
      access_token_key: req.session.oauthRequestToken || '',
      access_token_secret: req.session.oauthRequestTokenSecret || ''
    });

    client.get('search/tweets', {
      q: req.params.q,
      lang: 'es',
      result_type: req.query.type ? req.query.type : 'popular', // maybe: "recent" or default "popular"
      count: req.query.count ? req.query.count : 100 // max: 100
    }, function (error, tweets, response) {
      if (error) {
        var err = new _APIError2.default('Tweets API error', _httpStatus2.default.INTERNAL_SERVER_ERROR);
        return next(err);
      } else {
        return processTweets(tweets, res, req.query.analize, next);
      }
    });
  }
};

var processTweets = function processTweets(tweets, response, analize, next) {
  if (tweets) {
    var _ret = function () {
      var tweetsArray = [];
      tweets.statuses.forEach(function (tweet) {
        tweetsArray.push(tweet.text);
      });
      if (analize) {
        return {
          v: _monkey2.default.DO(tweetsArray, tweets.search_metadata.query, response)
        };
      } else {
        return {
          v: response.json({
            data: tweetsArray.slice(0, 1),
            status: {
              message: 'OK',
              code: _httpStatus2.default.OK
            }
          })
        };
      }
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    var err = new _APIError2.default('No Tweets.', _httpStatus2.default.INTERNAL_SERVER_ERROR);
    return next(err);
  }
};

exports.default = { search: search };
module.exports = exports['default'];
//# sourceMappingURL=search.controller.js.map
