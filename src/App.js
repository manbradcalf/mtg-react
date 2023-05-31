import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Search } from "./Search";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="../Magic_card_back.webp" className="App-logo" alt="logo" />
        <Search />
      </header>
    </div>
  );
}
export default App;
