import request from "supertest";
import Faker from "../../helpers/Faker";

import { server } from "../../main/server/server";

describe("Testing HTTP Tags endpoints", () => {
  let serverUp: any;

  beforeAll(async () => {
    process.env.IS_TESTING = "ok";
    serverUp = await server();
  });

  it("Creating tag", (done) => {
    request(serverUp)
      .post("/tags")
      .send({
        title: "Javascript2",
        description: "Test",
        _id: Faker.mongoObjectId,
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) {
          throw new Error("Error on create new tag!");
        }

        done();
      });
  }, 15000);

  it("Find by id!", (done) => {
    const tagId = "62dc1e4e986318c228ef6f53";
    request(serverUp)
      .get(`/tags/${tagId}`)
      .set("Accept", "application/json")
      .expect(
        200,
        {
          message: "Document gotten succesfull!",
          data: {
            _id: tagId,
            title: "Javascript2",
            description: "Test",
            __v: 0,
          },
        },
        done
      );
  }, 15000);

  it("Find all", (done) => {
    request(serverUp)
      .get("/tags")
      .set("Accept", "application/json")
      .expect(200, done);
  }, 15000);

  it("Update tag", (done) => {
    request(serverUp)
      .put("/tags")
      .send({
        title: "Javascript3",
        description: "Test",
        id: "62ea0763a2322b0d03e8b8b2",
      })
      .set("Accept", "application/json")
      .expect(200, done);
  }, 15000);
});
