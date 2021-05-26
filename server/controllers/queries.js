import Query from "../models/queries";

class Queries {

    async createQuery(req, res) {
        const query = new Query({
            name: req.body.name,
            email: req.body.email,
            query: req.body.query
        });

        await query.save();
        res.status(200).send({ status: 200, message: "query successfully created", query: query });
    }

    async getQuery(req, res) {
        const query = await Query.findOne({ _id: req.params.id });
        if (!query) return res.status(404).send({ status: 404, error: "Query not found!" });
        res.status(200).send({ status: 200, query: query });
    }

    async getQueries(req, res) {
        const queries = await Query.find();
        res.status(200).send({ status: 200, queries: queries });
    }

    async deleteQuery(req, res) {
        const query = await Query.findOne({ _id: req.params.id });
        if (!query) return res.status(404).send({ status: 404, error: "Query not found!" });
        await Query.deleteOne({ _id: req.params.id })
        res.status(204).send({ status: 204, message: "deleted successfully" });
    }

}

export default new Queries();
