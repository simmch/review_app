const express = require("express");
const app = express();
const config = require("config");
const client_id = config.get("client_id");
const client_secret = config.get("client_secret");
const path = require("path");
const connectDB = require("./config/db");
const axios = require("axios");

connectDB();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Hello World");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
  console.log(req.query.accessToken);
});

/*
  Authenticate User
*/
app.get("/login", (req, res) => {
  res.redirect(
    `https://discordapp.com/api/oauth2/authorize?client_id=670739113061646347&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Foauth%2Fredirect&response_type=code&scope=identify`
  );
});

/*
  Acquire Token
*/
app.get("/oauth/redirect", (req, res) => {
  const data = {
    grant_type: "authorization_code",
    code: req.query.code,
    redirect_uri: "http://localhost:5000/oauth/redirect",
    scope: "identify"
  };
  // Make call for Token
  axios
    .post(
      `https://discordapp.com/api/oauth2/token`,
      `client_id=${client_id}&client_secret=${client_secret}&grant_type=${data.grant_type}&code=${data.code}&redirect_uri=${data.redirect_uri}&scope=${data.scope}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
    .then(response => {
      const accessToken = response.data.access_token;
      console.log("SUCCESS GATHERING TOKEN: " + accessToken);
      res.redirect(`/welcome`);
    })
    .catch(err => {
      console.log("UNSUCCESSFUL GATHERING TOKEN " + err);
      res.redirect(`http://localhost:5000`);
    });
});

app.get("/welcome", (req, res) => {
  if (!req.query.accessToken) {
    res.redirect("/");
  }
  console.log("ERROR ROUTING TO WELCOME PAGE");
  //res.send("ACCESS TOKEN " + req.query.accessToken);
});
