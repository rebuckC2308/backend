const app = require("../index");
const supertest = require("supertest");

describe("/users", () => {
  it("POST : passing correct body", async () => {
    const payload = {
      email: "test@gmail.com",
      password: "usersPassword!",
    };
    await supertest(app).post("/users").send(payload).expect(200);
  });
});
