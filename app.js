const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database");
const User = require("./model/user");

dotenv.config();

connectDB();

/**
 * @description Get All users
 * @route GET /users
 */
const getAllUsers = async function (req, res, next) {
  try {
    const users = await User.find({});
    return res.status(200).json({ utilisateurs: users });
  } catch (e) {
    next(e);
  }
};

const router = express.Router();

router.route("/").get(getAllUsers);

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use("/users", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message });
});

module.exports = app;
