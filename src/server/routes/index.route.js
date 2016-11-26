import express from 'express';
import authRoutes from './auth.route';
import monkeyRoutes from './monkey.route'

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount routes
router.use('/auth', authRoutes);
router.use('/monkey', monkeyRoutes);

export default router;
