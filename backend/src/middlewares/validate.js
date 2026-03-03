const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  const validSchema = schema;
  const object = {
    params: req.params,
    query: req.query,
    body: req.body,
  };

  const { value, error } = validSchema.validate(object, { abortEarly: false, allowUnknown: true });

  if (error) {
    const details = error.details.map((d) => d.message);
    return next(new ApiError(httpStatus.BAD_REQUEST, details.join(', ')));
  }

  req.validated = value;
  return next();
};

module.exports = validate;

