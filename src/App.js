import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const Search = () => {
  const getCards = (card) =>
    fetch(`http://localhost:3001/scryfall-card/${card}`)
      // get it
      .then((res) => {
        // read it
        res.json().then((body) => {
          handleResult(body);
          console.log(body);
        });
      })
      .catch((err) => console.log(`error! ${err}`));

  const [cards, setCards] = useState([]);
  function handleResult(result) {
    setCards(result);
  }

  const [searchTerm, setSearchTerm] = useState("Thrashing Brontodon");
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Here"
        onChange={handleSearchTerm}
        value={searchTerm}
      />
      <button
        onClick={() => {
          getCards(searchTerm);
        }}
      >
        Search
      </button>
      <ul>
        {cards.map((card) => (
          <li key={card._id}>
            <img src={card.image_uris.small} />
            <div>
              <p>{card.name}</p>
              <p>${card.prices.usd}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="../Magic_card_back.webp" className="App-logo" alt="logo" />
        <Search query="Thrashing" />
      </header>
    </div>
  );
}
export default App;
