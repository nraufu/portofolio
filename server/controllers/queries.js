const { Query, validate } = require("../models/queries");

class Queries {

    async createQuery(req, res) {
        const { error } = validate(req.body);

        if (error) return res.status(400).send({ status: 400, error: error.details[0].message });

        const query = new Query({
            name: req.body.name,
            email: req.body.email,
            query: req.body.query
        });

        await query.save();
        res.status(200).send({ status: 200, message: "query successfully created", query: query });
    }

    async getQuery(req, res) {
        try {
            const query = await Query.findOne({ _id: req.params.id })
            res.status(200).send({ status: 200, query: query });
        } catch (error) {
            res.status(400).send({ status: 400, error: "Query not found!" });
        }
    }

    async getQueries(req, res) {
        try {
            const queries = await Query.find();
            res.status(200).send({ status: 200, queries: queries });
        } catch (error) {
            res.status(400).send({ status: 400, error: "queries not found" });
        }
    }

    async deleteQuery(req, res) {
        try {
            await Query.deleteOne({ _id: req.params.id })
            res.status(204).send({ status: 204, message: "deleted successfully" });
        } catch (error) {
            res.status(400).send({ status: 400, error: "queries not found" });
        }

    }

}

module.exports = new Queries();
