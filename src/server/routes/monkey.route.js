import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import monkeyCtrl from '../controllers/monkey.controller';
import config from '../../config/env';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /api/monkey - Lists of words */
router.route('/')
  .post(validate(paramValidation.monkey), monkeyCtrl.get);

export default router;
