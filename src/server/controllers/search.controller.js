import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Twitter from 'twitter'
import monkey from './monkey.controller'

const config = require('../../config/env');

let get = {
  type: (_req) => {
    // maybe:  "recent" or default "popular"
    return (_req.query.type ? _req.query.type : 'popular')
  },
  count: (_req) => {
    // max: 100
    return (_req.query.count ? _req.query.count : 100)
  }
};

let search = (req, res, next) => {
  if (req.params.q) {

    const type = get.type(req);
    const count = get.count(req);
    const client = new Twitter({
      consumer_key: config.auth.twitter.CONSUMER_KEY,
      consumer_secret: config.auth.twitter.CONSUMER_SECRET,
      access_token_key: req.session.oauthRequestToken || '',
      access_token_secret: req.session.oauthRequestTokenSecret || ''
    });

    console.log(`Search tweets by ${req.params.q}`);
    console.log(`Filter by type: ${type}`);
    console.log(`Filter by count: ${count}`);

    client.get('search/tweets', {
      q: req.params.q,
      lang: 'es',
      result_type: type,
      count: count
    }, (error, tweets, response) => {
      if(error) {
        console.log(error);
        const err = new APIError('Tweets API error', httpStatus.INTERNAL_SERVER_ERROR);
        return next(err);
      } else {
        return processTweets(tweets, res, (req.query.analize), next);
      }
    });
  }
};

let processTweets = (tweets, response, analize, next) => {
  if(tweets) {
    let tweetsArray = [];
    tweets.statuses.forEach( (tweet) => {
      tweetsArray.push(tweet.text);
    });
    if(analize) {
      return monkey.DO(tweetsArray, tweets.search_metadata.query, response);
    } else {
      return response.json({
        data: tweetsArray.slice(0, 1),
        status: {
          message: 'OK',
          code: httpStatus.OK
        }
      });
    }
  } else {
    const err = new APIError('No Tweets.', httpStatus.INTERNAL_SERVER_ERROR);
    return next(err);
  }
};

export default { search };
