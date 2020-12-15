const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb", parameterLimit: 50000 }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// enable cors
app.use(cors());

// routes basic
app.get('/', (req, res) => {
  const { name } = req.query;
  res.status(200).json({ success: true, message: `Hello ${name ? name : 'Guest'}!` });
});

// routes modules
const userRoute = require('./app/routes/users_router');
app.use('/api/users', userRoute);

// server initial
const PORT = process.env.PORT || 1337;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// handled promise error
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);

  server.close(() => process.exit(1)); // close server and exit
});

module.exports = app;