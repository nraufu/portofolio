const Joi = require("joi");
const returnError = require("../helpers/returnError");

const validations = {
    adminLogin(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().trim().email().required(),
            password: Joi.string().trim().required(),
        });

        returnError(req.body, res, schema, next);
    },

    blogPosts(req, res, next) {
        const schema = Joi.object({
            title: Joi.string().trim().min(10).required(),
            content: Joi.string().trim().min(300).required(),
            imgLink: Joi.string().trim().uri().min(10).required()
        });

        returnError(req.body, res, schema, next);
    },

    queries(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().min(5).max(50).required(),
            email: Joi.string().min(5).required().email(),
            query: Joi.string().min(100).required()
        });

        returnError(req.body, res, schema, next);
    },

    comment(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().trim().min(5).max(50).required(),
            comment: Joi.string().trim().min(5).required(),
        });

        returnError(req.body, res, schema, next);
    },

    params(req, res, next) {
        const schema = Joi.object({
            id: Joi.string().required()
        });

        returnError(req.params, res, schema, next);
    }
}

module.exports = validations;
