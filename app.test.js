const request = require("supertest");
const mongoose = require("mongoose");
const app = require("./app");
const User = require("./model/user");
const connectDB = require("./database");
const dotenv = require("dotenv");

dotenv.config();

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe("GET /users", () => {
  it("should return an empty list of users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body.utilisateurs).toEqual([]);
  });

  it("should return a list of users", async () => {
    const users = [
      { email: "sean_bean@gameofthron.es", name: "Ned Stark", password: "$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu" },
      { email: "mark_addy@gameofthron.es", name: "Robert Baratheon", password: "$2b$12$yGqxLG9LZpXA2xVDhuPnSOZd.VURVkz7wgOLY3pnO0s7u2S1ZO32y" },
      { email: "nikolaj_coster-waldau@gameofthron.es", name: "Jaime Lannister", password: "$2b$12$6vz7wiwO.EI5Rilvq1zUc./9480gb1uPtXcahDxIadgyC3PS8XCUK" }
      // Ajoute ici tous les autres utilisateurs
    ];

    await User.insertMany(users);

    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body.utilisateurs.length).toEqual(users.length);
    expect(res.body.utilisateurs[0].email).toEqual(users[0].email);
    expect(res.body.utilisateurs[1].email).toEqual(users[1].email);
    expect(res.body.utilisateurs[2].email).toEqual(users[2].email);
  });
});
