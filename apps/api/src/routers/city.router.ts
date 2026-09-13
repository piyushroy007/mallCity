import { Router } from 'express';
import * as cityController from '../controllers/city.controller';
import { validate } from '../middlewares/validate.middleware';
import { createCitySchema, updateCitySchema } from '../validators/city.validator';
import { verifyToken, requireRole } from '../middlewares/auth.middleware';
import { USER_ROLES } from '@mallcity/shared';

const router = Router();

router.get('/', cityController.getAllCities);
router.post('/', verifyToken, requireRole(USER_ROLES.ADMIN), validate(createCitySchema), cityController.createCity);

router.get('/indianCities', cityController.getIndianCities);
router.get('/indianCities/state/:state', cityController.getIndianCitiesByState);
router.get('/indianCities/district/:district', cityController.getIndianCitiesByDistrict);

router.get('/:cityId', cityController.getOneCity);
router.put('/:cityId', verifyToken, requireRole(USER_ROLES.ADMIN), validate(updateCitySchema), cityController.updateCity);

export default router;
