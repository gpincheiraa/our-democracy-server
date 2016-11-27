import httpStatus from 'http-status';
import MonkeyLearn from 'monkeylearn';

const config = require('../../config/env');

let DO = (searchArray, searchQuery, response) => {
  if (searchArray) {
    let ml = new MonkeyLearn(config.auth.monkeyLearn.TOKEN);
    let p = ml.classifiers.classify(config.auth.monkeyLearn.MODULE_ID, searchArray, true);

    console.log(`Searching ${searchQuery} by ${searchArray.length} tweets`);

    p.then( (_res) => {
      let responseData = _res.result;
      return response.json({
        search: searchQuery,
        count: responseData.length,
        data: responseData,
        status: {
          'message': 'OK',
          'code' : httpStatus.OK
        }
      });
    });
  }
};

export default { DO };
