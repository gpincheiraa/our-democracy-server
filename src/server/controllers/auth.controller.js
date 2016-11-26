import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import oauth from 'oauth';

const config = require('../../config/env');
const consumer = new oauth.OAuth(
    "https://twitter.com/oauth/request_token",
    "https://twitter.com/oauth/access_token",
    config.auth.twitter.CONSUMER_KEY,
    config.auth.twitter.CONSUMER_SECRET,
    "1.0A",
    `http://127.0.0.1:${config.port}/api/auth/callback`,
    "HMAC-SHA1"
);

let getToken = (req, res, next) => {
  consumer.getOAuthRequestToken( (error, oauthToken, oauthTokenSecret, results) => {
    if(error) {
      const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
      return next(err);
    } else {
      console.log(results);
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      return res.json({
        session: req.session,
        status: {
          'message': 'OK',
          'code' : httpStatus.OK
        }
      });
    }
  });
};

export default { getToken };
