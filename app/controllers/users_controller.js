const Joi = require("joi");
const models = require("../models/index");
const { decrypt } = require("../helpers/bcrypt");
const upload = require("../helpers/upload_photo");
const { generateToken } = require("../helpers/jwt");

class UsersController {
  static async registerUser(req, res, next) {
    const { email, password, is_admin } = req.body;
    const { filename, path } = req.file;

    const schema = Joi.object().keys({
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(7).required().strict(),
      photo: Joi.string(),
      is_admin: Joi.boolean(),
    });

    try {
      let payload = { email, password, photo: filename, is_admin };
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
        status: 201,
        success: true,
        message: "User was created successfully!",
        content: {
          id: data.dataValues.id,
          emaill: data.dataValues.email,
          photo: data.dataValues.photo,
          is_admin: data.dataValues.is_admin,
          createdAt: data.dataValues.createdAt,
          updatedAt: data.dataValues.updatedAt,
        },
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async loginUser(req, res, next) {
    const { email, password } = req.body;
    const schema = Joi.object().keys({
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(7).required().strict(),
    });

    try {
      await schema.validateAsync(req.body);
      const data = await models.User.findOne({
        where: { email },
      });

      if (!data)
        return res.status(401).json({
          status: 400,
          success: false,
          message: "Invalid credential",
        });

      const payload = {
        id: data.dataValues.id,
        email: data.dataValues.email,
        photo: data.dataValues.photo,
        is_admin: data.dataValues.is_admin,
      };

      if (data) {
        const token = generateToken(payload);
        let verify = decrypt(password, data.dataValues.password);
        if (verify) {
          res.status(200).json({
            status: 200,
            success: true,
            message: "login successfully",
            token,
          });
        } else {
          res.status(400).json({
            status: 400,
            success: false,
            message: "Invalid credential",
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: "Invalid credential",
        });
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        status: 500,
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = UsersController;
