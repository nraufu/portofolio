const mongoose = require('mongoose');

const Admin = mongoose.model('admin', new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    email: String,
    password: String
}));

module.exports = Admin;
