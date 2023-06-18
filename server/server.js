const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const { MongoClient } = require("mongodb");
const basicCardDetailsProjection = require("../CardDetailsProjection");

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

// TODO" Make these route names and defionitions make more sense
app.get("/scryfall-card/:name", async (req, res) => {
  console.log(req.params.name);
  let mongoQuery = {};
  mongoQuery.name = {
    $regex: req.params.name,
    $options: "i",
  };
  try {
    let cards = await cardCollection
      .find(mongoQuery, { projection: basicCardDetailsProjection })
      .toArray();
    res.json(cards);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get("/prices", async (req, res) => {
  console.log(`request is`);
  console.log(req.query);
  try {
    const cards = await cardCollection
      .find(
        {
          historicalPrices: {
            $elemMatch: { "price.usd": { $gt: parseInt(req.query.minPrice) } },
          },
        },
        { projection: basicCardDetailsProjection }
      )
      .toArray();
    res.json(cards);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});


// TODO: Move
const sleep = (millis) => {
  return new Promise((resolve) => setTimeout(resolve, millis));
};

class Prices {
  constructor(usd, usdFoil, number, eurFoil, tix) {
    this.usd = usd;
    this.usdFoil = usdFoil;
    this.number = number;
    this.eurFoil = eurFoil; 
    this.tix = tix;
  }
}

// TODO: Move
const updateAllPrices = async () => {
  console.log("calling update");
  const cards = await cardCollection.find().toArray();
  console.log("cards is");
  console.log(cards);
  for (const i in cards) {
    // todo get scryfall price using id
    await sleep(100);
    const res = await fetch(`https://api.scryfall.com/cards/${cards[i]._id}`);
    const scryfallCardResponse = await res.json();
    if (scryfallCardResponse.prices) {
      console.log(
        `prices for ${scryfallCardResponse.name}:\n ${JSON.stringify(
          scryfallCardResponse.prices
        )}\n`
      );

      const prices = new Prices(
        parseFloat(scryfallCardResponse.prices?.usd),
        parseFloat(scryfallCardResponse.prices?.usdFoil),
        parseFloat(scryfallCardResponse.prices?.eur),
        parseFloat(scryfallCardResponse.prices?.eurFoil),
        parseFloat(scryfallCardResponse.prices?.tix)
      );
      const updateResponse = await cardCollection.updateOne(
        { _id: cards[i]._id },
        {
          $push: {
            historicalPrices: {
              date: new Date(),
              price: prices,
            },
          },
        }
      );

      console.log(
        `updated: \n${JSON.stringify(updateResponse)}\n${
          scryfallCardResponse.name
        } is now ${JSON.stringify(scryfallCardResponse.prices)}`
      );
    } else {
      console.log(`NO PRICES FOR ${scryfallCardResponse.name}`);
    }
  }
};
app.post("/update-prices", async (req, res) => {
  console.log("upating prices");
  updateAllPrices(cardCollection);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
