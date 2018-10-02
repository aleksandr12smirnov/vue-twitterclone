const Joi = require('joi');

// Validate the signup inputs
let validateSignup = (req, res, next) => {

  // Rules for the validation of inputs
  const schema = Joi.object().keys({
    email: Joi.string().regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).required(),
    username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(8).max(20).required(),
    password: Joi.string().trim().min(8).required(),
    state: Joi.bool().required()
  });

  const body = req.body;

  // Check if the inputs are valid
  const validResult = Joi.validate(body, schema);

  if (validResult.error != null) {
    return res.status(400).json({
      message: 'The info is wrong',
      err: validResult
    });
  }

  next();

};

// Validate the edit inputs
let validateEdit = (req, res, next) => {

  // Rules for the validation of inputs
  const schema = Joi.object().keys({
    email: Joi.string().regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(8).max(20),
  });

  const body = req.body;

  // Check if the inputs are valid
  const validResult = Joi.validate(body, schema);

  if (validResult.error != null) {
    return res.status(400).json({
      message: 'The info is wrong',
      err: validResult
    });
  }

  next();

};

module.exports = {
  validateSignup,
  validateEdit
}