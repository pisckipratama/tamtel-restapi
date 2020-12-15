const router = require("express").Router();
const RoomsController = require("../controllers/rooms_controller");
const { protects, isAdmin } = require("../middlewares/auth");
const multer = require("../helpers/multer");

router.get("/", RoomsController.getAllRooms);
router.get("/:id", RoomsController.getOneRoom);
router.post(
  "/",
  protects,
  isAdmin(true),
  multer.createMulterRooms([".jpg", ".jpeg", ".png"]).single("photo"),
  RoomsController.postRoom
);

module.exports = router;
