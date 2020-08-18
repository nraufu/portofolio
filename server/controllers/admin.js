const { Admin, validate } = require("../models/admin");
const assignToken = require("../helpers/assignToken");

class User {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { error } = validate(req.body);
            if (error) return res.status(400).send({ status: 400, error: error.details[0].message });
            const admin = await Admin.findOne({ email: email });
            if (!admin) return res.status(400).send({ status: 400, error: "User doesn't exist" });
            if (admin.password !== password) return res.status(400).send({ status: 400, error: "Incorrect Password" });
            const token = assignToken({ admin: admin.email });
            return res.status(200).send({ status: 200, message: "successfully Login", token: token });
        } catch (error) {
            res.status(500).send({ status: 500, error: error.message });
        }
    }
}

module.exports = new User();
