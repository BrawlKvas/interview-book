const questions = require("../data/questions");

function registerHandler(app) {
  app.get("/questions", (req, res) => {
    res.json(questions);
  });
}

module.exports = registerHandler;
