const auth = (req, res, next) => {
  if (!req.cookies.access_token) {
    console.error("Access Token does not exist.");
    res.status(401, "/");
    res.send("Page Unavailable");
  } else {
    res.status(200, "Successfully Authenticated");
    console.log("Authorized");
  }
  next();
};

module.exports = auth;
