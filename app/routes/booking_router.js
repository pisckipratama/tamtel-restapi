const router = require("express").Router();
const BookingsController = require("../controllers/bookings_controller");
const { protects, isAdmin } = require("../middlewares/auth");

router.get("/", protects, BookingsController.getAllBooking);

module.exports = router;
