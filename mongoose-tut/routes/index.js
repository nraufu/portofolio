const express = require('express');
const router = express.Router();
const Posts = require("../controllers/posts");

router.get("/", function (req, res) {
    return res.send({
        message: 'Hello there 👋'
    });
});
router.get("/posts", Posts.getPosts);
router.get("/posts/:id", Posts.getPost);
router.post("/posts", Posts.createPosts);
router.patch("/posts/:id", Posts.editPost);
router.delete("/posts/:id", Posts.deletePost);


module.exports = router;
