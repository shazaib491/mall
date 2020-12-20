const joi = require("joi");
const userValidation = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(8).required(),
  confirmPassword: joi.string().min(8).required(),
});

const loginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required()
});

module.exports = { userValidation, loginValidation} ;



