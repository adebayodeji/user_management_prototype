const jwt = require('jsonwebtoken');

const generateToken = (userEmail, password) => jwt.sign({
	userEmail,
	password
},
	process.env.secret,
	{ expiresIn: "5h" }
);

module.exports = generateToken;