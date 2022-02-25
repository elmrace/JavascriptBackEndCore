const Joi = require("joi");

const createValidation = Joi.object({
  name: Joi.string().required().min(5),
  user_id: Joi.string().required().min(24).max(24),
});

module.exports = {
  createValidation,
};
