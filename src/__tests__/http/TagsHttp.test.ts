import request from "supertest";

import { app } from "../../main/config/apps";

describe("Testing HTTP Tags endpoints", () => {
  let appFramework: any;

  beforeAll(() => {
    appFramework = app();
  });

  it("Creating tag", (done) => {
    request(appFramework)
      .post("/tags")
      .send({
        title: "Javascript2",
        description: "Test",
        _id: "62dc1e4e986318c228ef6f76",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201, done);
  }, 15000);
});
