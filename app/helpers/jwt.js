const jwt = require("jsonwebtoken");

function generateToken(token) {
  return jwt.sign(token, process.env.SECRET);
}

function verifyToken(payload) {
  return jwt.verify(payload, process.env.SECRET);
}

module.exports = { generateToken, verifyToken };
