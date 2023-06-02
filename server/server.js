const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const { MongoClient } = require("mongodb");
const basicCardDetailsProjection = require("../CardDetailsProjection");
const { getCardsThatCostAtLeast } = require("./controller");

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "mtg-collection";
// Use connect method to connect to the server

client.connect();

console.log("Connected successfully to server");
const db = client.db(dbName);
const cardCollection = db.collection("cardstwo");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/scryfall-card/:name", async (req, res) => {
  console.log(req.params.name);
  let mongoQuery = {};
  mongoQuery.name = {
    $regex: req.params.name,
    $options: "i",
  };
  try {
    console.log(mongoQuery);
    let cards = await cardCollection
      .find(mongoQuery, { projection: basicCardDetailsProjection })
      .toArray();
    console.log(cards);
    res.json(cards);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/prices", async (req, res) => {
  console.log(`request is`);
  console.log(req.query);
  try {
    const cards = await cardCollection
      .find({
        historicalPrices: { $elemMatch: { "price.usd": { $gt: parseInt(req.query.minPrice)} } },
      }, {projection: basicCardDetailsProjection })
      .toArray();
    res.json(cards);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
