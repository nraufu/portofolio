import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import { data } from "./testData";

const { expect } = chai;
chai.use(chaiHttp);

export let token;

describe('Admin login', () => {
    it('should return 400 bad request status when an invalid admin Email passed in', (done) => {
        chai
            .request(app)
            .post("/auth/login")
            .send(data.invalidAdminEmail)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.have.property("error");
                done();
            })
    });

    it('should return 400 bad request status when an invalid admin Password passed in', (done) => {
        chai
            .request(app)
            .post("/auth/login")
            .send(data.invalidAdminPassword)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.have.property("error");
                done();
            })
    });

    it('should return 200 ok status and token on admin logged in', (done) => {
        chai
            .request(app)
            .post("/auth/login")
            .send(data.validAdmin)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.have.property("token");
                token = res.body.token;
                done();
            })
    });
})
