// validations/userSchema.js
const Joi = require('joi');

exports.userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});