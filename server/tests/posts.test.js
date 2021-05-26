import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import { data } from "./testData";
import { token } from "./admin.test";

const { expect } = chai;
chai.use(chaiHttp);

export let postId;

describe("blog posts", () => {
    it('should return 200 ok status code when a post created successfully by the admin', (done) => {
        chai
            .request(app)
            .post("/posts")
            .set("x-auth-token", token)
            .send(data.validPost)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("post");
                postId = res.body.post._id;
                done();
            })
    });

    it('should return 400 bad Request status code when an invalid field is posted', (done) => {
        chai
            .request(app)
            .post("/posts")
            .set("x-auth-token", token)
            .send(data.invalidPost)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property("error");
                done();
            })
    });

    it('should return 401 unauthorized status code when no token is provided', (done) => {
        chai
            .request(app)
            .post("/posts")
            .send(data.invalidPost)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property("Error");
                done();
            })
    });

    it('should return 403 forbidden status code  when an invalid token is used', (done) => {
        chai
            .request(app)
            .post("/posts")
            .set("x-auth-token", data.invalidToken)
            .send(data.invalidPost)
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body).to.have.property("Error");
                done();
            })
    });

    it('should return 200 ok status when all posts are retrieved', (done) => {
        chai
            .request(app)
            .get("/posts")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("posts");
                done();
            });
    });

    it('should return 200 ok status when retrieve a specific post', (done) => {
        chai
            .request(app)
            .get(`/posts/${postId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("post");
                done();
            });
    });

    it('should return 200 ok status when post edited successfully', (done) => {
        chai
            .request(app)
            .patch(`/posts/${postId}`)
            .set("x-auth-token", token)
            .send(data.editedPost)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("post");
                done();
            });
    });

    it('should return 200 ok status when a post is deleted successfully', (done) => {
        chai
            .request(app)
            .delete(`/posts/${postId}`)
            .set("x-auth-token", token)
            .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            });
    });

    it('should return 404 not Found status when a post is not found', (done) => {
        chai
            .request(app)
            .get(`/posts/${postId}`)
            .set("x-auth-token", token)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property("error");
                done();
            });
    });

    it('should return 200 ok status code when creating another blog Post', (done) => {
        chai
            .request(app)
            .post("/posts")
            .set("x-auth-token", token)
            .send(data.validPost)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("post");
                postId = res.body.post._id;
                done();
            });
    });
});

