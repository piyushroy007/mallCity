import Joi from 'joi';

export const registerSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().trim(),
    username: Joi.string().alphanum().min(3).max(30).required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).optional(),
  }).required(),
});

export const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required(),
  }).required(),
});
