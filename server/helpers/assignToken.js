const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (data) => jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: "1d"
});
