const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Hello World");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
