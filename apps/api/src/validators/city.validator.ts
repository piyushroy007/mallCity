import Joi from 'joi';

export const createCitySchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().trim(),
    cityCode: Joi.number().integer().required(),
    state: Joi.string().required().trim(),
  }).required(),
});

export const updateCitySchema = Joi.object({
  params: Joi.object({
    cityId: Joi.string().required(),
  }).required(),
  body: Joi.object({
    name: Joi.string().optional().trim(),
    cityCode: Joi.number().integer().optional(),
    state: Joi.string().optional().trim(),
  }).min(1).required(),
});
