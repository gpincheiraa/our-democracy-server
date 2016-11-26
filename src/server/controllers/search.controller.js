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
      result_type: 'popular'
    }, (error, tweets, response) => {
      processTweets(tweets, res);
    });
  }
};

let processTweets = (tweets, response) => {
  if(tweets) {
    let tweetsArray = [];
    tweets.statuses.forEach( (tweet) => {
      tweetsArray.push(tweet.text);
    });
    return monkey.DO(tweetsArray, tweets.search_metadata.query);
  }
};

export default { search };
