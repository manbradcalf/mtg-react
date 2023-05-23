const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/scryfall-card/:id", (req, res) => {
  res.json({ id: req.params.id });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
