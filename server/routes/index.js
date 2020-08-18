import express from 'express';
import Posts from "../controllers/posts";
import Queries from "../controllers/queries";
import User from "../controllers/admin";
import verifyToken from "../middlewares/verifyToken";
import validations from "../middlewares/validations";
import comments from '../controllers/comments';
import like from '../controllers/like';

const router = express.Router();

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


export default router;
