const {
    Query,
    validate
} = require("../models/queries");

class Queries {

    async createQuery(req, res) {
        const {
            error
        } = validate(req.body);

        if (error) return res.status(400).send({ error: error.details[0].message });

        const query = new Query({
            name: req.body.name,
            email: req.body.email,
            query: req.body.query
        });

        await query.save();
        res.status(200).send(query);

    }

    async getQueries(req, res) {
        try {
            const queries = await Query.find();
            res.status(200).send(queries);
        } catch (error) {
            res.status(400).send(error);
        }

    }

}

module.exports = new Queries();
