const assert = require("assert");
const request = require("supertest");
const app = require("../app");
const { doesNotMatch } = require("assert");

describe("Express api", () => {
  it("Handles GET request", (app) => {
    request(app)
      .get("/api/v1/language")
      .end((err, res) => {
        assert(res.body.languages === []);
        done();
      });
  });
});
