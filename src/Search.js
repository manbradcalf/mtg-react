import { useEffect, useState } from "react";
import { SearchResult } from "./SearchResult";

export const Search = () => {
  const getCards = (card) =>
    // todo: move?
    fetch(`http://localhost:3001/scryfall-card/${card}`)
      .then((res) => {
        res.json().then((body) => {
          handleCards(body);
        });
      })
      .catch((err) => console.log(`error! ${err}`));

  const [cards, setCards] = useState([]);

  function handleCards(result) {
    setCards(result);
  }

  const [searchTerm, setSearchTerm] = useState("Thrashing Brontodon");
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input className="Search-Bar"
        type="text"
        placeholder="Search Here"
        onChange={handleSearchTerm}
        value={searchTerm}
      />
      <button className="Search-Button"
        onClick={() => {
          getCards(searchTerm);
        }}
      >
        Search
      </button>
      <div className="Search-Results">
        {cards.map((card) => (
          <SearchResult
            name={card.name}
            image_uri={card.image_uris?.normal || "../Magic_card_back.webp"}
            price={card.prices.usd}
          />
        ))}
      </div>
    </div>
  );
};
