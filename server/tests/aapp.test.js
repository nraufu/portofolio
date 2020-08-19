import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

const { expect } = chai;
chai.use(chaiHttp);

describe("/server running", () => {
    it('should return 200 ok status', (done) => {
        chai
            .request(app)
            .get("/")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.have.property("message");
                done();
            });
    });
});

describe('wrong endpoint', () => {
    it('should return 400 bad request status', (done) => {
        chai
            .request(app)
            .get("/nonExist")
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property("Error");
                done();
            })
    });
})
