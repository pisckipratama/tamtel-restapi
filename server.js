const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const scheduler = require('./app/helpers/scheduler');

app = express();

// middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "50mb",
    parameterLimit: 50000,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// enable cors
app.use(cors());

scheduler.runningScheduler;

// routes modules
const userRoute = require("./app/routes/users_router");
const roomRoute = require("./app/routes/rooms_router");
const bookingRoute = require('./app/routes/booking_router');
app.use("/api/users", userRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/booking", bookingRoute);

// server initial
const PORT = process.env.PORT || 1337;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// handled promise error
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  server.close(() => process.exit(1)); // close server and exit
});

module.exports = app;
