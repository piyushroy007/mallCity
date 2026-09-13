import { Router } from 'express';
import * as shopController from '../controllers/shop.controller';
import { upload } from '../middlewares/upload.middleware';
import { verifyToken, requireRole } from '../middlewares/auth.middleware';
import { USER_ROLES } from '@mallcity/shared';

const router = Router();

router.get('/', shopController.getAllShops);
router.post('/', verifyToken, requireRole(USER_ROLES.ADMIN), upload.single('shopImg'), shopController.createShop);

export default router;
