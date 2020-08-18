const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    query: {
        type: String,
        min: 10,
        required: true,
    }
});

const Query = mongoose.model("queries", schema);

module.exports = Query;
