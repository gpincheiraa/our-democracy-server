import httpStatus from 'http-status';
import MonkeyLearn from 'monkeylearn';

const config = require('../../config/env');

let DO = (searchArray, searchQuery, response) => {
  if (searchArray) {
    let ml = new MonkeyLearn(config.auth.monkeyLearn.TOKEN);
    let p = ml.classifiers.classify(config.auth.monkeyLearn.MODULE_ID, searchArray, true);

    p.then( (_res) => {
      let responseData = processAnalize(_res.result);
      return response.json({
        search: searchQuery,
        count: _res.result.length,
        data: responseData,
        status: {
          'message': 'OK',
          'code' : httpStatus.OK
        }
      });
    });
  }
};

function processAnalize(analize){
  let obj = {};
 
  let Negative = analize.filter((aux) =>{
     return aux[0].label === 'Negative'
  }).length;

  let Neutral = analize.filter((aux) =>{
     return aux[0].label === 'Neutral'
  }).length;
  let Positive = analize.filter((aux) =>{
     return aux[0].label === 'Positive'
  }).length;

  obj.negative = Negative;
  obj.positive = Positive;
  obj.neutral = Neutral;
  obj.total = Positive + Neutral + Negative;
  return obj;
}
export default { DO };
