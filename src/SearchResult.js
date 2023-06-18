export const SearchResult = (props) => {
  return (
    <div className="Search-Result">
      <img src={props.image_uri} />
      <div>
        <p>{props.name}</p>
        <p>${props.price}</p>
        <a href={props.scryfall_uri} target="_blank" rel="noopener noreferrer">
          Scryfall
        </a>
      </div>
    </div>
  );
};
