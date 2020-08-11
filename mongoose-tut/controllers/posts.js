const Post = require("../models/posts");

class Posts {
    async getPosts(req, res) {
        const posts = await Post.find()
        res.send(posts);
    }

    async createPosts(req, res) {
        const post = new Post({
            title: req.body.title,
            content: req.body.content
        });
        await post.save();
        res.send(post);
    }

    async getPost(req, res) {
        try {
            const post = await Post.findOne({
                _id: req.params.id
            });
            res.send(post);
        } catch (error) {
            res.status(404);
            res.send({
                error: "Post doesn't exist!"
            });
        }

    }

    async editPost(req, res) {
        try {
            const {
                title,
                content
            } = req.body;

            const post = await Post.findOne({
                _id: req.params.id
            })
            if (title) {
                post.title = title;
            }

            if (content) {
                post.content = content;
            }

            await post.save();
            res.send(post);

        } catch (error) {
            res.status(404);
            res.send({
                error: "Post doesn't exist!"
            });
        }
    }

    async deletePost(req, res) {
        try {
            await Post.deleteOne({
                _id: req.params.id
            })
            res.status(204).send()
        } catch (error) {
            res.status(404);
            res.send({
                error: "Post doesn't exist!"
            });
        }
    }
}

module.exports = new Posts();
