import Post from "../models/posts";

class Like {
    async likePost(req, res) {
        const post = await Post.findOne({ _id: req.params.id });
        if (!post) return res.status(404).send({ status: 404, error: "Post not found!" });
        await Post.updateOne({ _id: req.params.id }, { $inc: { likes: 1 } });
        return res.status(200).send({ status: 200, message: "Liked!!!" });
    }
}


export default new Like();
