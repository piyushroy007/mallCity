import Joi from 'joi';

export const createShopSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().trim(),
    city: Joi.string().required().trim(),
    mallName: Joi.string().required().trim(),
    mallId: Joi.string().optional(),
    description: Joi.string().required(),
    shopType: Joi.string().required().trim(),
    floorNo: Joi.string().required().trim(),
    address: Joi.string().optional().allow(''),
    contactNumber: Joi.string().optional().allow(''),
    rating: Joi.number().min(0).max(5).optional(),
    shopImg: Joi.string().optional(),
  }).required(),
});
