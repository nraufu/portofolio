const express = require('express');
const router = express.Router();
const Posts = require("../controllers/posts");
const Queries = require("../controllers/queries");
const User = require("../controllers/admin");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", function (req, res) {
    return res.send({
        message: 'Hello there 👋'
    });
});

router.post("/posts", verifyToken, Posts.createPosts);
router.get("/posts", Posts.getPosts);
router.get("/posts/:id", Posts.getPost);
router.patch("/posts/:id", verifyToken, Posts.editPost);
router.delete("/posts/:id", verifyToken, Posts.deletePost);

router.post("/queries", Queries.createQuery);
router.get("/queries", verifyToken, Queries.getQueries);
router.get("/queries/:id", verifyToken, Queries.getQuery);
router.delete("/queries/:id", verifyToken, Queries.deleteQuery);

router.post("/auth/login", User.login);

module.exports = router;
