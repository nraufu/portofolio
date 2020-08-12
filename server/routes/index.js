const express = require('express');
const router = express.Router();
const Posts = require("../controllers/posts");
const Queries = require("../controllers/queries");

router.get("/", function (req, res) {
    return res.send({
        message: 'Hello there 👋'
    });
});

router.post("/posts", Posts.createPosts);
router.get("/posts", Posts.getPosts);

router.post("/queries", Queries.createQuery);
router.get("/queries", Queries.getQueries);

module.exports = router;
