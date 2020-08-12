const Joi = require("joi");
const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        min: 150,
        required: true
    },
    imageLink: {
        type: String,
        required: true
    }
});

const Post = mongoose.model("posts", schema);

function validatePosts(post) {
    const schema = Joi.object({
        title: Joi.string().min(10).required(),
        content: Joi.string().min(300).required(),
        imgLink: Joi.string().uri().min(10).required()
    });

    return schema.validate(post);
}

exports.Post = Post;
exports.validate = validatePosts;
