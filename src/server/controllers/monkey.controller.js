import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import MonkeyLearn from 'monkeylearn'

const config = require('../../config/env');

function get(req, res, next) {
  if (req.body.search) {
    let ml = new MonkeyLearn('dd137db1d75032bb63044096b8f9cb6e81296030');
    let module_id = 'cl_u9PRHNzf';
    let text_list = ["hola como estas", "maldito hijo de perra", "que mujer mas guapa"];
    let p = ml.classifiers.classify(module_id, text_list, true);

    p
      .then( (_res) => {
        console.log(_res.result);
        return res.json({
          list: _res.result,
          status: {
            'message': 'OK',
            'code' : httpStatus.OK
          }
        });

      });


  }

}

export default { get };
