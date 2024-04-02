const express = require("express");
const bodyParser = require("body-parser");
const registerQuestionsHandler = require("./handlers/questions");
const registerAuthHandler = require("./handlers/auth");
const registerTagsHandler = require("./handlers/tags");
const app = express();
const port = 3033;

app.use(bodyParser.json());

registerQuestionsHandler(app);
registerAuthHandler(app);
registerTagsHandler(app);

app.listen(port, () => {
  console.log(`Mock server running at ${port} port`);
});
