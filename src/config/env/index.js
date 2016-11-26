import path from 'path';

const env = process.env.NODE_ENV || 'development';
const config = require(`./${env}`); // eslint-disable-line import/no-dynamic-require

const defaults = {
  root: path.join(__dirname, '/..'),
  auth: {
    twitter: {
      CONSUMER_KEY : 'bO4vqoJpmtxN6um768i6rtCyp',
      CONSUMER_SECRET: 'AZyIk8vtllzjFa9FSKjVBK5UkoNP6grt396HlOBipzF4Tfvmxh',
      CALLBACK : '/auth/login'
    },
    monkeyLearn: {
      TOKEN : 'dd137db1d75032bb63044096b8f9cb6e81296030',
      MODULE_ID : 'cl_u9PRHNzf'
    }
  }
};

export default Object.assign(defaults, config);
