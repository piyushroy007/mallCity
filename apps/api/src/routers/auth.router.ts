import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { verifyToken, requireRole } from '../middlewares/auth.middleware';
import { USER_ROLES } from '@mallcity/shared';

const router = Router();

router.post('/', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', verifyToken, authController.getMe);
router.get('/', verifyToken, requireRole(USER_ROLES.ADMIN), authController.getAllUsers);

export default router;
