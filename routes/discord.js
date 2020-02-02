const express = require("express");
const router = express.Router();
const config = require("config");
const client_id = config.get("client_id");
const client_secret = config.get("client_secret");
const axios = require("axios");

// @route   GET /discord/login
// @desc    Authentication Route
// @access  Public

router.get("/login", (req, res) => {
  res.redirect(
    `https://discordapp.com/api/oauth2/authorize?client_id=670739113061646347&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fdiscord%2Foauth%2Fredirect&response_type=code&scope=identify%20guilds`
  );
});

// @route   GET /discord/oauth/redirect
// @desc    Acquire Authentication Token
// @access  Public

router.get("/oauth/redirect", (req, res) => {
  const data = {
    grant_type: "authorization_code",
    code: req.query.code,
    redirect_uri: "http://localhost:5000/discord/oauth/redirect",
    scope: "identify guilds"
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
      res.redirect(`/discord/welcome`);
    })
    .catch(err => {
      console.log("UNSUCCESSFUL GATHERING TOKEN " + err);
      res.redirect(`http://localhost:5000`);
    });
});

// @route   /discord/welcome
// @desc    Redirect to Welcome Page After Authentication Token Received
// @public  Public
router.get("/welcome", (req, res) => {
  // if (!req.query.accessToken) {
  //   res.redirect("/");
  // }
  res.send("ACCESS TOKEN: " + req.query.code);
  console.log("Routed to Welcome Page");
});

module.exports = router;
