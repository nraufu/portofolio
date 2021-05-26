import Post from "../models/posts";

class Posts {

    async createPosts(req, res) {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            imageLink: req.body.imgLink
        });
        await post.save();
        res.status(200).send({ status: 200, message: "post successfully created", post: post });
    }

    async getPosts(req, res) {
        const posts = await Post.find()
        res.status(200).send({ status: 200, posts: posts });
    }

    async getPost(req, res) {
        const post = await Post.findOne({ _id: req.params.id });
        if (!post) return res.status(404).send({ status: 404, error: "Post not found!" });
        res.status(200).send({ status: 200, post: post });
    }

    async editPost(req, res) {
        const { title, content, imgLink } = req.body;
        const post = await Post.findOne({ _id: req.params.id });
        if (!post) return res.status(404).send({ status: 404, error: "Post not found!" });

        if (title) {
            post.title = title
        }

        if (content) {
            post.content = content;
        }

        if (imgLink) {
            post.imageLink = imgLink
        }

        await post.save()
        res.status(200).send({ status: 200, message: "successfully edited", post: post });
    }

    async deletePost(req, res) {
        const post = await Post.findOne({ _id: req.params.id });
        if (!post) return res.status(404).send({ status: 404, error: "Post not found!" });
        await Post.deleteOne({ _id: req.params.id });
        res.status(204).send({ status: 204, message: "deleted successfully" });
    }

}

export default new Posts();
