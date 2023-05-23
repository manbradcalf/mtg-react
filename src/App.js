import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

// const [cards, getCards] = useState('')

const getCards = (card) =>
  fetch(`http://localhost:3001/scryfall-card/${card}`)
    .then((res) => console.log(`res is ${res.data}`))
    .catch((err) => console.log(`error! ${err}`));

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("Sol Ring");
  const handleChange = (e) => {
    console.log("e is " + e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Here"
        onChange={handleChange}
        value={searchTerm}
      />
      <button onClick={()=>{getCards(searchTerm)}}>Search</button>
    </div>
  );
};

function App() {
  useEffect(() => {
    getCards();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src="../Magic_card_back.webp" className="App-logo" alt="logo" />
        <p>Magic the Gathering Collection Manager under construction.</p>
        <SearchBar searchTerm="test" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
export default App;
