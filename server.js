const express = require("express");
const app = express();
const config = require("config");
const path = require("path");
const connectDB = require("./config/db");

connectDB();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Hello World");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use("/discord", require("./routes/discord/discordRoutes"));
