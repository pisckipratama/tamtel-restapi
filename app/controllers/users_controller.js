const Joi = require("joi");
const models = require("../models/index");
const { decrypt } = require("../helpers/bcrypt");
const upload = require("../helpers/upload_photo");

class UsersController {
  static async registerUser(req, res, next) {
    const { email, password } = req.body;
    const { filename, path } = req.file;

    const schema = Joi.object().keys({
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(7).required().strict(),
      photo: Joi.string(),
    });

    try {
      let payload = { email, password, photo: filename };
      await schema.validateAsync(payload);
      const checkUser = await models.User.findAll({
        where: { email },
      });

      if (checkUser.length > 0) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: "User is already exists, please use another email!",
        });
      }

      const url = await upload.uploadPhoto(path);
      payload.photo = url;
      const data = await models.User.create(payload);

      res.status(201).json({
        code: 201,
        success: true,
        message: "User was created successfully!",
        data,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UsersController;
