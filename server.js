const express = require("express");
const app = express();
const connectDB = require("./config/db");
connectDB();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Hello World");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
