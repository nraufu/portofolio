const { Admin } = require("../models/admin");
require("dotenv").config();

async function refreshDb() {
    await Admin.deleteOne({ email: process.env.ADMINUSERNAME });
}

const adminCredentials = {
    email: process.env.ADMINUSERNAME,
    password: process.env.ADMINPASSWORD
}

refreshDb();

const newLogin = new Admin(adminCredentials);
newLogin.save();
