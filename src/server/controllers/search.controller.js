import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Twitter from 'twitter'

const config = require('../../config/env');

let search = (req, res, next) => {
  if (req.params.q) {

    const client = new Twitter({
      consumer_key: config.auth.twitter.CONSUMER_KEY,
      consumer_secret: config.auth.twitter.CONSUMER_SECRET,
      access_token_key: req.session.oauthRequestToken || '',
      access_token_secret: req.session.oauthRequestTokenSecret || ''
    });

    client.get('search/tweets', { q: req.params.q }, (error, tweets, response) => {
      processTweets(tweets, res);
    });
  }
};

let processTweets = (tweets, response) => {
  if(tweets) {
    let tweetTexts = [];
    tweets.statuses.forEach( (tweet) => {
      tweetTexts.push(tweet.text);
    });

    return response.json({
      search_string: '',
      data: tweetTexts,
      status: {
        'message': 'OK',
        'code' : httpStatus.OK
      }
    });
  }
};

export default { search };
