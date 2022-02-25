const Joi = require('joi');

const createValidation = Joi.object({
    name: Joi.string().required().min(5),
    email: Joi.string().email().required().min(10),
    password: Joi.string().required().min(5)
});

const loginValidation = Joi.object({
    email: Joi.string().email().required().min(10),
    password: Joi.string().required().min(5)
})

module.exports = {
    createValidation, loginValidation
}