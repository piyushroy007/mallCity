const Joi = require('joi');

// Example health validator (no fields required here, but pattern shown)
const getHealth = Joi.object({
  params: Joi.object().keys({}),
  query: Joi.object().keys({}),
  body: Joi.object().keys({}),
});

module.exports = {
  getHealth,
};

