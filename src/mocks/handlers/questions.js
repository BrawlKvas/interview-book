const questions = require("../data/questions");
const tags = require("../data/tags");

function registerHandler(app) {
  app.get("/questions", (req, res) => {
    const { name = "" } = req.query;
    const tags = req.query.tags ? req.query.tags.split(",") : null;

    res.json(
      questions.filter(
        (question) =>
          question.name.includes(name) &&
          (!tags || question.tags.some((tag) => tags.includes(String(tag.id))))
      )
    );
  });

  app.post("/questions", (req, res) => {
    const { name = "", tagIds = [] } = req.body;

    const newQuestions = {
      id: questions[questions.length - 1]?.id + 1 || 1,
      name,
      tags: tagIds.map((tagId) => tags.find((tag) => tag.id === tagId)),
    };

    questions.push(newQuestions);

    res.json(newQuestions);
  });

  app.delete("/questions/:id", (req, res) => {
    const { id } = req.params;

    const index = questions.findIndex((question) => question.id === +id);

    questions.splice(index, 1);

    res.json({});
  });

  app.patch("/questions", (req, res) => {
    const { id, name, tagIds } = req.body;

    const question = questions.find((question) => question.id === +id);

    question.name = name;
    question.tags = tagIds.map((tagId) => tags.find((tag) => tag.id === tagId));

    res.json({});
  });
}

module.exports = registerHandler;
