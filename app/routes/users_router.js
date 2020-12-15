const router = require("express").Router();
const UsersController = require("../controllers/users_controller");
const multer = require("../helpers/multer");

router.post(
  "/register",
  multer.createMulter([".jpg", ".jpeg", ".png"]).single("photo"),
  UsersController.registerUser
);

router.post("/login", UsersController.loginUser);

module.exports = router;
