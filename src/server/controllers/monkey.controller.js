import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import MonkeyLearn from 'monkeylearn';

const config = require('../../config/env');

let DO = (searchArray, searchQuery) => {
  if (searchArray) {
    let ml = new MonkeyLearn(config.auth.monkeyLearn.TOKEN);
    let p = ml.classifiers.classify(config.auth.monkeyLearn.MODULE_ID, searchArray, true);

    console.log(`Searching ${searchQuery} by ${searchArray.length} tweets`);
    searchArray.forEach( (tweet) => {
      console.log(tweet);
    });

    p.then( (_res) => {
      return res.json({
        search: searchQuery,
        list: _res.result,
        status: {
          'message': 'OK',
          'code' : httpStatus.OK
        }
      });
    });
  }
};

export default { DO };
