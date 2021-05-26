import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import { data } from "./testData";
import { postId } from "./posts.test";

const { expect } = chai;
chai.use(chaiHttp);

describe('Comment on a blog Post', () => {
    it('should return 200 ok status code on successful comment post', (done) => {
        chai
            .request(app)
            .post(`/posts/comment/${postId}`)
            .send(data.validComment)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
    });

    it('should return 400 bad request status when passed an invalid comment', (done) => {
        chai
            .request(app)
            .post(`/posts/comment/${postId}`)
            .send(data.invalidComment)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it('should return 404 not found status when passed an invalid post Id', (done) => {
        chai
            .request(app)
            .post(`/posts/comment/${data.invalidPostID}`)
            .send(data.validComment)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property("error");
                done();
            });
    });
});
