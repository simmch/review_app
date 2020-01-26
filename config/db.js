const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true
    });
    console.log("DB Connected");
  } catch (err) {
    console.log("Unsuccessful Connection");
    console.error(err);
  }
};

module.exports = connectDB;
