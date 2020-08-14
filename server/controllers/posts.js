const {
    Post,
    validate
} = require("../models/posts");

class Posts {

    async createPosts(req, res) {
        const {
            error
        } = validate(req.body);
        if (error) return res.status(400).send({ error: error.details[0].message });

        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            imageLink: req.body.imgLink
        });
        await post.save();
        res.status(200).send(post);
    }

    async getPosts(req, res) {
        const posts = await Post.find()
        res.status(200).send(posts);
    }

}

module.exports = new Posts();
