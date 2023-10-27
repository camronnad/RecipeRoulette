import React, { useState, useEffect } from "react";
import SearchButton from "./SearchButton";
import SearchContainer from "./SearchContainer";
function SearchBar(props) {
  const [imgSpin, setImgSpin] = useState(false);
  const toggleSpin = () => {
    setImgSpin(!imgSpin);
  };
  const [search, setSearch] = useState("");

  const inputChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const searchHandler = () => {
    toggleSpin()
    //can use search query here for futher processing with sending data to server
    console.log("search query:", search);
    let searchData;
    const searchQuery = search;
    // useEffect(() => {
    // fetch(`/api/search?${searchQuery}`)
    fetch(`/api/search?query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the JSON data from the response here
        props.setRecipeData(data);
        console.log(data);
        toggleSpin()
      })
      .catch((error) => {
        // Handle the error, possibly by logging or displaying an error message.
        console.error("Fetch error:", error);
        toggleSpin()
      });
      
    //console.log("searchData", searchData);
    // }, []);
    // searchHandler should be a hook and within use useEffect eg useSearchHandler
  };

  return (
    <>
      <div className="left-column">
        {imgSpin ? (
          <img
            src="roulette.png"
            className="rouletteImg animate"
            alt="Roulette "
          />
        ) : (
          <img
            src="roulette.png"
            alt="Roulette Animation"
            className="rouletteImg"
          />
        )}
        <input
          className="inputSize"
          type="text"
          placeholder="Type your search here and hit spin"
          value={search}
          onChange={inputChangeHandler}
        />
      </div>

      <div className="right-column">
        <SearchButton label={props.label} clickHandler={searchHandler} />
      </div>
    </>
  );
}

export default SearchBar;
