const express = require('express');
const router = express.Router();
const Posts = require("../controllers/posts");

router.get("/", function (req, res) {
    return res.send({
        message: 'Hello there 👋'
    });
});

router.post("/posts", Posts.createPosts);
router.get("/posts", Posts.getPosts);

module.exports = router;
