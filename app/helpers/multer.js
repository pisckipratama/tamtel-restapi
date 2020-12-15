const multer = require("multer");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

moment.locale("id");

const createDirIfNotExist = async (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

exports.createMulter = (allowedTypes = [], filesize = 4096 * 4096) => {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      try {
        const destinationPath = path.join(__dirname, "../../public/uploads");
        createDirIfNotExist(destinationPath);

        callback(null, destinationPath);
      } catch (error) {
        callback(new Error("Error when choosing destination field."));
      }
    },
    filename: (req, file, callback) => {
      let time = moment().unix();
      let username = req.body.email.split("@");

      try {
        const filext = file.originalname.substring(
          file.originalname.lastIndexOf(".")
        );

        callback(null, `${time}-${username[0]}` + filext);
      } catch (error) {
        callback(new Error("Error when generating file name"));
      }
    },
  });

  return multer({
    fileFilter: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      let valid = true;

      if (allowedTypes.length > 0) {
        valid = allowedTypes.includes(ext);

        if (!valid) {
          return callback(new Error("File is not allowed!"));
        }
      }

      callback(null, true);
    },
    storage,
    limits: { filesize },
  });
};

exports.createMulterRooms = (allowedTypes = [], filesize = 4096 * 4096) => {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      try {
        const destinationPath = path.join(__dirname, "../../public/uploads");
        createDirIfNotExist(destinationPath);

        callback(null, destinationPath);
      } catch (error) {
        callback(new Error("Error when choosing destination field."));
      }
    },
    filename: (req, file, callback) => {
      let time = moment().unix();
      let username = req.user.email.split("@");
      let title = req.body.room_name.split(" ").join("").toLowerCase();

      try {
        const filext = file.originalname.substring(
          file.originalname.lastIndexOf(".")
        );

        callback(null, `${time}-${username[0]}-${title}` + filext);
      } catch (error) {
        callback(new Error("Error when generating file name"));
      }
    },
  });

  return multer({
    fileFilter: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      let valid = true;

      if (allowedTypes.length > 0) {
        valid = allowedTypes.includes(ext);

        if (!valid) {
          return callback(new Error("File is not allowed!"));
        }
      }

      callback(null, true);
    },
    storage,
    limits: { filesize },
  });
};
