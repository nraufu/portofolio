const mongoose = require("mongoose");
const Joi = require("joi");

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

function validateQueries(query) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).required().email(),
        query: Joi.string().min(100).max(300).required()
    });

    return schema.validate(query);
}

exports.Query = Query;
exports.validate = validateQueries;
