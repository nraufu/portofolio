import Admin from "../models/admin";
import { assignToken } from "../helpers/assignToken";

class User {
    async login(req, res) {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email: email });
        if (!admin) return res.status(400).send({ status: 400, error: "User doesn't exist" });
        if (admin.password !== password) return res.status(400).send({ status: 400, error: "Incorrect Password" });
        const token = assignToken({ admin: admin.email });
        return res.status(200).send({ status: 200, message: "successfully Login", token: token });
    }
}

export default new User();
