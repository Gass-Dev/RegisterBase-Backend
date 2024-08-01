const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoDB = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
