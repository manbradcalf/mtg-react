import { useEffect, useState } from "react";
import { getCards } from "./App"; // todo: i dont love this


export const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("Thrashing Brontodon");
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
      <button
        onClick={() => {
          getCards(searchTerm);
        }}
      >
        Search
      </button>
    </div>
  );
};
