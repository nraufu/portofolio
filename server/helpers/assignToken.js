import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const assignToken = (data) => jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: "1d"
});
