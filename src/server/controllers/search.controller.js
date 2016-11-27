import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Twitter from 'twitter'
import monkey from './monkey.controller'

const config = require('../../config/env');

let search = (req, res, next) => {
  if (req.params.q) {

    const client = new Twitter({
      consumer_key: config.auth.twitter.CONSUMER_KEY,
      consumer_secret: config.auth.twitter.CONSUMER_SECRET,
      access_token_key: req.session.oauthRequestToken || '',
      access_token_secret: req.session.oauthRequestTokenSecret || ''
    });

    client.get('search/tweets', {
      q: req.params.q,
      lang: 'es',
      result_type: (req.query.type ? req.query.type : 'popular'), // maybe: "recent" or default "popular"
      count: (req.query.count ? req.query.count : 100) // max: 100
    }, (error, tweets, response) => {
      if(error) {
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
      console.log("qwe");
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
