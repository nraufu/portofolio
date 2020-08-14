const Joi = require("joi");
const mongoose = require('mongoose');

const Admin = mongoose.model('admin', new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    email: String,
    password: String
}));

function validateAdmin(admin) {
    const schema = Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().required(),
    });

    return schema.validate(admin);
}

exports.validate = validateAdmin;
exports.Admin = Admin;
