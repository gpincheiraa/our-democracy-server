import httpStatus from 'http-status';
import MonkeyLearn from 'monkeylearn';

const config = require('../../config/env');

let DO = (searchArray, searchQuery, response) => {
  if (searchArray) {
    let ml = new MonkeyLearn(config.auth.monkeyLearn.TOKEN);
    let p = ml.classifiers.classify(config.auth.monkeyLearn.MODULE_ID, searchArray, true);

    console.log(`Searching ${searchQuery} by ${searchArray.length} tweets`);

    p.then( (_res) => {
      return response.json({
        search: searchQuery,
        data: processAnalize(_res.result),
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
  let Negative = analize.data[0].map((aux) =>{
     return aux.label === 'Negative'
  }).lenght;
  let Neutral = analize.data[0].map((aux) =>{
     return aux.label === 'Neutral'
  }).lenght;
  let Positive = analize.data[0].map((aux) =>{
     return aux.label === 'Positive'
  }).lenght;

  obj.negative = Negative;
  obj.Positive = Positive;
  obj.Neutral = Neutral;
  obj.Total = Positive + Neutral + Negative;
  return Obj;
}
export default { DO };
