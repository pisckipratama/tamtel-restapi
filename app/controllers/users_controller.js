const Joi = require('joi');
const models = require('../models/index');

class UsersController {
  static async registerUser (req, res, next) {
    const body = req.body;
    const schema = Joi.object().keys({
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(7).required().strict(),
    })
  }
}