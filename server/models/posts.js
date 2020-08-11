const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title: String,
    content: String,
    imageLink: String
});

module.exports = mongoose.model("posts", schema);
