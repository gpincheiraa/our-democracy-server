import express from 'express';
import searchCtrl from '../controllers/search.controller';
import config from '../../config/env';

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/search/:something - Do search on twitter an process by monkeyLearn controller */
router.route('/:q').get(searchCtrl.search);

export default router;
