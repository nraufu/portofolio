import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import { data } from "./testData";
import { token } from "./admin.test";

const { expect } = chai;
chai.use(chaiHttp);

let queryId;

describe('Queries', () => {
    it('should return 401 unauthorized status code  when no token is provided', (done) => {
        chai
            .request(app)
            .get("/queries")
            .send(data.validQuery)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property("Error");
                done();
            })
    });

    it('should return 403 forbidden status code when an invalid token is used', (done) => {
        chai
            .request(app)
            .get("/queries")
            .set("x-auth-token", data.invalidToken)
            .send(data.validQuery)
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body).to.have.property("Error");
                done();
            })
    });

    it('should return 200 ok status when a query is created', (done) => {
        chai
            .request(app)
            .post("/queries")
            .set("x-auth-token", token)
            .send(data.validQuery)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("query");
                queryId = res.body.query._id;
                done();
            });
    });

    it('should return 400 bad status when trying to create an invalid query', (done) => {
        chai
            .request(app)
            .post("/queries")
            .set("x-auth-token", token)
            .send(data.invalidQuery)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property("error");
                done();
            });
    });

    it('should return 200 ok status when a query found successfully', (done) => {
        chai
            .request(app)
            .get("/queries")
            .set("x-auth-token", token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("queries");
                done();
            });
    });

    it('should return 200 ok status when a query found successfully', (done) => {
        chai
            .request(app)
            .get(`/queries/${queryId}`)
            .set("x-auth-token", token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("query");
                done();
            });
    });

    it('should return 204 no content status when a query is deleted', (done) => {
        chai
            .request(app)
            .delete(`/queries/${queryId}`)
            .set("x-auth-token", token)
            .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            });
    });

    it('should return 404 found status when no query found', (done) => {
        chai
            .request(app)
            .get(`/queries/${queryId}`)
            .set("x-auth-token", token)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property("error");
                done();
            });
    });
});
