const jwt = require('jsonwebtoken');

const generateToken = (username, password) =>
  jwt.sign(
    {
      username,
      password
    },
    process.env.secret,
    { expiresIn: "5h" }
  );
module.exports = generateToken;