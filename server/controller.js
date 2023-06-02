// import { Card, PricesResponse, Prices } from "../types/ScryfallCard.ts";
// import { basicCardDetailsProjection } from "../util/queryProjections.ts";
// import { sleep } from "../util/mapper.ts";
// console.log("in controller.ts...");

// const getCards = async () => {
//   const queryParams = helpers.getQuery(ctx);
//   const mongoQuery = {};
//   if (queryParams.minPrice) {
//     mongoQuery.historicalPrices = {
//       $elemMatch: { "price.usd": { $gt: parseFloat(queryParams.minPrice) } },
//     };
//   }
//   if (queryParams.cardname) {
//     mongoQuery.name = {
//       $regex: queryParams.cardname,
//       $options: "i",
//     };
//   }
//   if (queryParams.oracletext) {
//     mongoQuery.oracle_text = {
//       $regex: queryParams.oracletext,
//       $options: "i",
//     };
//   }
//   try {
//     let cards = await cardCollection.find(mongoQuery, {projection: basicCardDetailsProjection}).toArray()
//     return cards;
//   } catch (err) {
//     console.log(err);
//     ctx.response.body = { status: false, data: null };
//     ctx.response.status = 500;
//   }
// };

// async function findCards(mongoQuery) {
//   await cardCollection
//     .find(mongoQuery, { projection: basicCardDetailsProjection })
//     .toArray();
// }

// async function getCardByScryfallId(id) {
//   const cardInfo = await cardCollection.findOne({ id: id });
//   return cardInfo;
// }

// async function getCardsByName(cardName) {
//   console.log("in controller, getCardsByName(" + cardName + ")");
//   const cardInfo = await cardCollection
//     .find(
//       {
//         name: { $regex: cardName, $options: "i" },
//       },
//       { projection: basicCardDetailsProjection }
//     )
//     .toArray();
//   return cardInfo;
// }

// async function getCardsByOracleText(oracleText) {
//   console.log(`finding ${oracleText}`);

//   const cardInfo = await cardCollection
//     .find(
//       {
//         oracle_text: { $regex: oracleText, $options: "i" },
//       },
//       { projection: basicCardDetailsProjection }
//     )
//     .toArray();
//   return cardInfo;
// }

const getCardsThatCostAtLeast = async (price) => {
  const cards = await cardCollection
    .find({
      historicalPrices: { $elemMatch: { "price.usd": { $gt: price } } },
    })
    .toArray();

  return cards;
}

// const addTodaysPriceToCard = async (ctx) => {
//   if (ctx.params.id) {
//     const card = await getCardByScryfallId(ctx.params.id);
//     const price= card.prices;
//     const response = await cardCollection.updateOne(
//       { _id: ctx.params.id },
//       { $push: { historicalPrices: { date: new Date(), price: price } } }
//     );
//     ctx.response.body = { status: true, data: response };
//     ctx.response.status = 200;
//   } else {
//     ctx.response.body = {
//       status: false,
//       data: { message: `Unable to update card price for ${ctx.params.id}` },
//     };
//   }
// };
// const addCard = async (ctx) => {
//   try {
//     const card = await ctx.request.body().value;
//     console.log(card);
//     const id = await cardCollection.insertOne(card);
//     ctx.response.body = { status: true, data: id };
//     ctx.response.status = 201;
//   } catch (err) {
//     ctx.response.body = { status: false, data: null };
//     ctx.response.status = 500;
//     console.log(err);
//   }
// };

// async function updateAllPrices() {
//   const cards = await cardCollection.find().toArray();
//   for (const i in cards) {
//     // todo get scryfall price using id
//     await sleep(100);
//     const res = await fetch(`https://api.scryfall.com/cards/${cards[i]._id}`);
//     const scryfallCardResponse = await res.json();
//     if (scryfallCardResponse.prices) {
//       console.log(
//         `prices for ${scryfallCardResponse.name}:\n ${JSON.stringify(
//           scryfallCardResponse.prices
//         )}\n`
//       );

//       const prices= new Prices(
//         parseFloat(scryfallCardResponse.prices?.usd),
//         parseFloat(scryfallCardResponse.prices?.usdFoil),
//         parseFloat(scryfallCardResponse.prices?.eur),
//         parseFloat(scryfallCardResponse.prices?.eurFoil),
//         parseFloat(scryfallCardResponse.prices?.tix)
//       );
//       const updateResponse = await cardCollection.updateOne(
//         { _id: cards[i]._id },
//         {
//           $push: {
//             historicalPrices: {
//               date: new Date(),
//               price: prices,
//             },
//           },
//         }
//       );

//       console.log(
//         `updated: \n${JSON.stringify(updateResponse)}\n${
//           scryfallCardResponse.name
//         } is now ${JSON.stringify(scryfallCardResponse.prices)}`
//       );
//     } else {
//       console.log("NO PRICES FOR " + scryfallCardResponse.name);
//     }
//   }
// }
