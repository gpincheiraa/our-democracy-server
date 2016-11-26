import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const config = require('../../config/env');
const client = new Twitter({
  consumer_key: config.auth.twitter.CONSUMER_KEY,
  consumer_secret: config.auth.twitter.CONSUMER_SECRET,
  access_token_key: req.session.oauthRequestToken || '',
  access_token_secret: req.session.oauthRequestTokenSecret || ''
});

let search = (req, res, next) => {
  if (req.params.q) {
    client.get('search/tweets', {q: req.params.q}, (error, tweets, response) => {
      console.log(tweets);
    });
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
};

export default { search };
