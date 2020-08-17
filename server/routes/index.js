const express = require('express');
const router = express.Router();
const Posts = require("../controllers/posts");
const Queries = require("../controllers/queries");
const User = require("../controllers/admin");
const verifyToken = require("../middlewares/verifyToken");
const validations = require("../middlewares/validations");
const comments = require('../controllers/comments');
const like = require('../controllers/like');

router.get("/", function (req, res) {
    return res.send({
        message: 'Hello there 👋'
    });
});

router.post("/posts", verifyToken, validations.blogPosts, Posts.createPosts);
router.get("/posts", Posts.getPosts);
router.get("/posts/:id", Posts.getPost);
router.patch("/posts/:id", verifyToken, validations.blogPosts, Posts.editPost);
router.delete("/posts/:id", verifyToken, validations.params, Posts.deletePost);
router.post("/posts/comment/:id", validations.params, validations.comment, comments.addComment);
router.post("/posts/like/:id", validations.params, like.likePost);

router.post("/queries", validations.queries, Queries.createQuery);
router.get("/queries", verifyToken, Queries.getQueries);
router.get("/queries/:id", verifyToken, Queries.getQuery);
router.delete("/queries/:id", verifyToken, validations.params, Queries.deleteQuery);

router.post("/auth/login", validations.adminLogin, User.login);


module.exports = router;
