import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const config = require('../../config/env');

// sample user, used for authentication
const user = {
  username: 'test'
};

/**
 * Returns authentication token
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  if (req.body.username === user.username) {
    return res.json({
      username: user.username,
      status: {
        'message': 'OK',
        'code' : httpStatus.OK
      }
    });
  }

  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
  return next(err);
}

export default { login };
