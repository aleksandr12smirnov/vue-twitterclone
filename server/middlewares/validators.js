const Joi = require('joi');

let validateSignup = (req, res, next) => {

  // Rules for the validation of inputs
  const schema = Joi.object().keys({
    email: Joi.string().regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).required(),
    username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(8).max(20).required(),
    password: Joi.string().min(8).required()
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
  validateSignup
}