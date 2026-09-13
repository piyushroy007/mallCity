import Joi from 'joi';

export const createMallSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().trim(),
    city: Joi.string().required().trim(),
    cityCode: Joi.number().integer().required(),
    description: Joi.string().required(),
    noOffloor: Joi.number().integer().min(1).required(),
    address: Joi.string().required(),
    mallImg: Joi.string().optional(),
  }).required(),
});
