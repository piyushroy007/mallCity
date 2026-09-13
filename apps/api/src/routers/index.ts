import { Router } from 'express';
import authRouter from './auth.router';
import cityRouter from './city.router';
import mallRouter from './mall.router';
import shopRouter from './shop.router';
import logRouter from './log.router';
import healthRouter from './health.router';

const router = Router();

// API V1 Routes
router.use('/v1/auth', authRouter);
router.use('/v1/admin', authRouter); // backward compatibility alias for auth
router.use('/v1/city', cityRouter);
router.use('/v1/mall', mallRouter);
router.use('/v1/shop', shopRouter);
router.use('/v1/shared/malls', mallRouter);
router.use('/v1/shared/shops', shopRouter);
router.use('/v1/logs', logRouter);
router.use('/v1/health', healthRouter);
router.use('/health', healthRouter);

export default router;
