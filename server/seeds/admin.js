import Admin from "../models/admin";
import dotenv from "dotenv";

dotenv.config();

const refreshDb = async () => {
    await Admin.deleteOne({ email: process.env.ADMINUSERNAME });
}

const createAdmin = () => {
    const adminCredentials = {
        email: process.env.ADMINUSERNAME,
        password: process.env.ADMINPASSWORD
    }

    refreshDb();

    const newLogin = new Admin(adminCredentials);
    newLogin.save();
}

export default createAdmin;
