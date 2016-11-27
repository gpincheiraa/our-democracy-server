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

var get = {
  type: function type(_req) {
    // maybe:  "recent" or default "popular"
    return _req.query.type ? _req.query.type : 'popular';
  },
  count: function count(_req) {
    // max: 100
    return _req.query.count ? _req.query.count : 100;
  },
  lang: function lang(_req) {
    // maybe: "en" or default: "es"
    var langs = ['en', 'es'];
    if (_req.query.lang && _req.query.lang in langs) {
      return _req.query.lang;
    } else {
      return langs[1];
    }
  }
};

var search = function search(req, res, next) {

  if (req.params.q) {
    (function () {

      var type = get.type(req);
      var count = get.count(req);
      var lang = get.lang(req);
      var client = new _twitter2.default({
        consumer_key: config.auth.twitter.CONSUMER_KEY,
        consumer_secret: config.auth.twitter.CONSUMER_SECRET,
        access_token_key: req.session.oauthRequestToken || '',
        access_token_secret: req.session.oauthRequestTokenSecret || ''
      });

      console.log('Search tweets by ' + req.params.q);
      console.log('Filter by type: ' + type);
      console.log('Filter by count: ' + count);
      console.log('Filter by lang: ' + lang);

      client.get('search/tweets', {
        q: req.params.q,
        lang: lang,
        result_type: type,
        count: count
      }, function (error, tweets, response) {
        if (error) {
          console.log(error);
          var err = new _APIError2.default('Tweets API error', _httpStatus2.default.INTERNAL_SERVER_ERROR);
          return next(err);
        } else {
          return processTweets(tweets, res, req.query.analize, lang, next);
        }
      });
    })();
  }
};

var processTweets = function processTweets(tweets, response, analize, lang, next) {
  if (tweets) {
    var _ret2 = function () {
      var tweetsArray = [];
      tweets.statuses.forEach(function (tweet) {
        tweetsArray.push(tweet.text);
      });
      if (analize) {
        return {
          v: _monkey2.default.DO(tweetsArray, tweets.search_metadata.query, lang, response)
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

    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
  } else {
    var err = new _APIError2.default('No Tweets.', _httpStatus2.default.INTERNAL_SERVER_ERROR);
    return next(err);
  }
};

exports.default = { search: search };
module.exports = exports['default'];
//# sourceMappingURL=search.controller.js.map
