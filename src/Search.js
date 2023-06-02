import { useEffect, useState } from "react";
import { SearchResult } from "./SearchResult";

export const Search = () => {
  const getCardsByName = (card) =>
    // todo: move?
    fetch(`http://localhost:3001/scryfall-card/${card}`)
      .then((res) => {
        res.json().then((body) => {
          handleCards(body);
        });
      })
      .catch((err) => console.log(`error! ${err}`));

  const getCardsByPrice = (price) =>
    fetch(`http://localhost:3001/prices?minPrice=${price}`)
      .then((res) => {
        res.json().then((body) => {
          console.log(cards.map(x=>x.name))
          handleCards(body);
        });
      })
      .catch((err) => console.log(`error! ${err}`));

  const [cards, setCards] = useState([]);

  function handleCards(result) {
    console.log(result)
    setCards(result);
  }

  const [searchTerm, setSearchTerm] = useState("Thrashing Brontodon");
  const [minPrice, setMinPrice] = useState("1");

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };
  const handlePriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  return (
    <div>
      <input
        className="Search-Bar"
        type="text"
        placeholder="Search Here"
        onChange={handleSearchTerm}
        value={searchTerm}
      />
      <button
        className="Search-Button"
        onClick={() => {
          getCardsByName(searchTerm);
        }}
      >
        Search by Name
      </button>

      <input
        className="Search-Bar"
        type="text"
        placeholder="Search Here By Price"
        onChange={handlePriceChange}
        value={minPrice}
      />
      <button
        className="Search-Button"
        onClick={() => {
          getCardsByPrice(minPrice);
        }}
      >
        Search by Price
      </button>

      <div className="Search-Results">
        {cards.map((card) => (
          <SearchResult
            name={card.name}
            image_uri={card.image_uris?.normal || "../Magic_card_back.webp"}
            price={card.prices?.usd}
          />
        ))}
      </div>
    </div>
  );
};
