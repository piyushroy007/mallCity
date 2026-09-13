import { Router } from 'express';
import * as logController from '../controllers/log.controller';

const router = Router();

router.post('/', logController.ingestLog);

export default router;
