const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadPhoto = async (path) => {
  try {
    const image = await cloudinary.uploader.upload(path);
    fs.unlinkSync(path); // remove from server
    return image.url;
  } catch (error) {
    new Error("Error when upload to cloud!");
  }
};
