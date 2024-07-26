const mockingoose = require("mockingoose");
const request = require("supertest");

const model = require("./user");
const app = require("../app");

describe("test mongoose User model", () => {
  it("should return the doc with findById", () => {
    const _doc = {
      _id: "507f191e810c19729de860ea",
      name: "name",
      email: "name@email.com",
    };

    mockingoose(model).toReturn(_doc, "findOne");

    return model.findById({ _id: "507f191e810c19729de860ea" }).then((doc) => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });

  it("should return the doc with find", () => {
    const _doc = [
      {
        _id: "507f191e810c19729de860ea",
        name: "name",
        email: "name@email.com",
      },
    ];

    mockingoose(model).toReturn(_doc, "find");

    return model.find({}).then((doc) => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });

  it("should return an empty array with find", () => {
    mockingoose(model).toReturn([], "find");

    return model.find({}).then((docs) => {
      expect(docs).toEqual([]);
    });
  });

  it("responds with an error", async () => {
    mockingoose(model).toReturn(new Error("something wrong"), "find");

    const response = await request(app)
      .get("/users")
      .set("Accept", "application/json");

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("something wrong");
  });
});
