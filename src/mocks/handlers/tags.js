const tags = require("../data/tags");

function registerHandler(app) {
  app.get("/tags", (req, res) => {
    const { name = "" } = req.query;

    res.json(tags.filter((tag) => tag.name.includes(name)));
  });

  app.post("/tags", (req, res) => {
    const { name } = req.body;

    const newTag = {
      id: tags[tags.length - 1].id + 1,
      name,
    };

    tags.push(newTag);

    res.json(newTag);
  });

  app.get("/tags/:id", (req, res) => {
    const { id } = req.params;

    res.json(tags.find((tag) => tag.id === +id));
  });
}

module.exports = registerHandler;
