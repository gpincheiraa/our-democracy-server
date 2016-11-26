import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const config = require('../../config/env');

function search(req, res, next) {
  if (req.params.q) {
    return res.json({
      searched: req.params.q,
      status: {
        'message': 'OK',
        'code' : httpStatus.OK
      }
    });
  }

  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
  return next(err);
}

export default { search };
