import React, { useState, useEffect } from "react";
import SearchButton from "./SearchButton";
import SearchContainer from "./SearchContainer";
function SearchBar(props) {

  const toggleSpin = () => {
    props.setImgSpin(!props.imgSpin);
  };
  const [search, setSearch] = useState("");

  const inputChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const searchHandler = () => {
    props.setImgSpin(true); 
    console.log("togglespin called:", props.imgSpin);
    console.log("search query:", search);
    let searchData;
    const searchQuery = search;
   
    fetch(`/api/search?query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("togglespin called right after dataa:", props.imgSpin);
        setTimeout(() => {
          props.setRecipeData(data);
          console.log("setRecipeData called with data:", data);
          props.setImgSpin(false); 
        }, 6000);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        toggleSpin();
      });
  };

  return (
    <>
      <div className="left-column">
        {props.imgSpin ? (
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