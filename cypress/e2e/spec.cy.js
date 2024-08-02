describe("GET /users", () => {
  it("gets a list of users", () => {
    cy.request("GET", "/users").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.utilisateurs).length.to.be.greaterThan(1);
    });
  });
});

describe("POST /users", () => {
  it("creates a new user", () => {
    const newUser = {
      name: "Jojo",
      email: "jojo@gmail.com",
      password: "password123",
    };

    cy.request("POST", "/users", newUser).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("_id"); // Ensure to check for _id as it's added by Mongoose
      expect(response.body.name).to.eq(newUser.name);
      expect(response.body.email).to.eq(newUser.email);
    });
  });
});
