const jwt = require("jsonwebtoken");
const ErrorResponse = require("../helpers/error_response");
const models = require("../models/index");

// protect routes
exports.protects = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // make sure token exist
  if (!token) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }

  // verify user
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const data = await models.User.findOne({
      where: { id: decode.id, email: decode.email },
    });

    req.user = {
      id: data.dataValues.id,
      email: data.dataValues.email,
      photo: data.dataValues.photo,
      is_admin: data.dataValues.is_admin,
      created_at: data.dataValues.createdAt,
      updated_at: data.dataValues.updatedAt,
    };

    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }
};

// grant access to spesific roles
exports.isAdmin = (condition) => {
  return (req, res, next) => {
    if (req.user.is_admin !== condition) {
      return next(
        new ErrorResponse(
          `User is not authorize to access this route`,
          403
        )
      );
    }
    next();
  };
};
