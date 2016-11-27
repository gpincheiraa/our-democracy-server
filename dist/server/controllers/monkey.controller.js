'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _monkeylearn = require('monkeylearn');

var _monkeylearn2 = _interopRequireDefault(_monkeylearn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../../config/env');

var DO = function DO(searchArray, searchQuery, response) {
  if (searchArray) {
    var ml = new _monkeylearn2.default(config.auth.monkeyLearn.TOKEN);
    var p = ml.classifiers.classify(config.auth.monkeyLearn.MODULE_ID, searchArray, true);

    p.then(function (_res) {
      var responseData = processAnalize(_res.result);
      return response.json({
        search: searchQuery,
        count: _res.result.length,
        data: responseData,
        status: {
          'message': 'OK',
          'code': _httpStatus2.default.OK
        }
      });
    });
  }
};

function processAnalize(analize) {
  var obj = {};

  var Negative = analize.filter(function (aux) {
    return aux[0].label === 'Negative';
  }).length;

  var Neutral = analize.filter(function (aux) {
    return aux[0].label === 'Neutral';
  }).length;
  var Positive = analize.filter(function (aux) {
    return aux[0].label === 'Positive';
  }).length;

  obj.negative = Negative;
  obj.positive = Positive;
  obj.neutral = Neutral;
  obj.total = Positive + Neutral + Negative;
  return obj;
}
exports.default = { DO: DO };
module.exports = exports['default'];
//# sourceMappingURL=monkey.controller.js.map
