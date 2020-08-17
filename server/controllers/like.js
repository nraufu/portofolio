const Post = require("../models/posts");

class Like {
    async likePost(req, res) {
        try {
            const post = await Post.findOne({ _id: req.params.id });
            if (!post) return res.status(404).send({ status: 404, error: "Post not found!" });
            await Post.updateOne({ _id: req.params.id }, { $inc: { likes: 1 } });
            return res.status(200).send({ status: 200, message: "Liked!!!" });
        } catch (error) {
            res.status(400).send({ status: 400, error: "Post doesn't exist!" });
        }
    }
}


module.exports = new Like();
