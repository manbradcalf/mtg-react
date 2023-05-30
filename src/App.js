import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";

export const getCards = (card) =>
  fetch(`http://localhost:3001/scryfall-card/${card}`)
    // get it
    .then((res) => {
      // read it
      res.json().then((body) => {
        console.log(body[0]);
      });
    })
    .catch((err) => console.log(`error! ${err}`));

const SearchResult = (props) => {

  const [result, setResult] = useState({ name: "testing", id: "id" });

  useEffect(() => {
    console.log("using effect");
    fetch(`http://localhost:3001/scryfall-card/${props.query}`)
      // get it
      .then((res) => {
        // read it
        res.json().then((body) => {
          console.log(body);
          body.forEach((i) => console.log(i.name));
          setResult(body[0]);
        });
      })
      .catch((err) => console.log(`error! ${err}`));
  }, [result]);

  return (
    <div>
      <p>{result.name}</p>
      <p>{result.id}</p>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="../Magic_card_back.webp" className="App-logo" alt="logo" />
        <SearchBar />
        <SearchResult query="Thrashing" />
      </header>
    </div>
  );
}
export default App;
