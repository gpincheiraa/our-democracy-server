import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const config = require('../../config/env');

function get(req, res, next) {
  if (req.body.search) {
    return res.json({
      list: req.body.search,
      status: {
        'message': 'OK',
        'code' : httpStatus.OK
      }
    });
  }

  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
  return next(err);
}

export default { get };
