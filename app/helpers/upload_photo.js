const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "dtx75b7pa",
  api_key: "492632934581276",
  api_secret: "oNEvxSHtx7ka0wVLH_ABcPgEXNg",
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
