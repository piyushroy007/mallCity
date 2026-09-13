import { Router } from 'express';
import * as mallController from '../controllers/mall.controller';
import { upload } from '../middlewares/upload.middleware';
import { verifyToken, requireRole } from '../middlewares/auth.middleware';
import { USER_ROLES } from '@mallcity/shared';

const router = Router();

router.get('/', mallController.getAllMalls);
router.post('/', verifyToken, requireRole(USER_ROLES.ADMIN), upload.single('mallImg'), mallController.createMall);

export default router;
