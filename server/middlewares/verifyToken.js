import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.status(401).send({ status: 401, Error: "unauthorized access" });
        const authorizedUser = jwt.verify(token, process.env.SECRET_KEY);
        req.authorizedUser = authorizedUser;
        next();
    } catch (error) {
        return res.status(403).send({ status: 403, Error: "Token invalid or expired" });
    }
}

export default verifyToken;
