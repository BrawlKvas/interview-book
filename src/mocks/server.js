const express = require("express");
const registerQuestionsHandler = require("./handlers/questions");
const registerAuthHandler = require("./handlers/auth");
const app = express();
const port = 3033;

registerQuestionsHandler(app);
registerAuthHandler(app);

app.listen(port, () => {
  console.log(`Mock server running at ${port} port`);
});
