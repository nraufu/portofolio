import Post from "../models/posts";

class Comments {
    async addComment(req, res) {
        const { name, comment } = req.body;
        const post = await Post.findOne({ _id: req.params.id });
        if (!post) return res.status(404).send({ status: 404, error: "Post not found!" });
        await Post.updateOne({ _id: req.params.id }, { $push: { comments: { name: name, comment: comment } } });
        return res.status(200).send({ status: 200, message: "comment posted Successfully" });
    }
}

export default new Comments();
