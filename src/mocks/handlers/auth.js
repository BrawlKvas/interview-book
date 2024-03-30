function registerHandler(app) {
  app.post("/auth/auth", (req, res) => {
    res.json({
      access_token: "some.jwt.here",
      refresh_token: "some.jwt.here",
    });
  });

  app.post("/auth/register", (req, res) => {
    res.json({
      access_token: "some.jwt.here",
      refresh_token: "some.jwt.here",
    });
  });
}

module.exports = registerHandler;
