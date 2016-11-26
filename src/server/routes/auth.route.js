import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import authCtrl from '../controllers/auth.controller';
import config from '../../config/env';

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/token - Returns token if authentication success */
router.route('/token')
  .post(validate(paramValidation.login), authCtrl.login);

export default router;
