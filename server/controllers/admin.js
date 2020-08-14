const { Admin, validate } = require("../models/admin");
const assignToken = require("../helpers/assignToken");

class User {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { error } = validate(req.body);
            if (error) return res.status(400).send({ error: error.details[0].message });
            const admin = await Admin.findOne({ email: email });
            if (!admin) return res.status(400).send({ error: "User doesn't exist" });
            if (admin.password !== password) return res.status(400).send({ error: "Incorrect Password" });
            const token = assignToken({ admin: admin.email });
            return res.status(200).send({ message: "successfully Login", token: token });
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
}

module.exports = new User();
