const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.status(400).send({
            Error: "unauthorized access"
        });
        const authorizedUser = jwt.verify(token, process.env.SECRET_KEY);
        req.authorizedUser = authorizedUser;
        next();
    } catch (error) {
        return res.status(401).send({
            Error: "Token invalid or expired"
        });
    }
}

module.exports = verifyToken;
