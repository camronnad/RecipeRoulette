import React, { useState } from "react";
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
    setImgSpin(true); // Start spinning at the beginning of the search
    console.log("togglespin called:", imgSpin);
    //can use search query here for futher processing with sending data to server
    console.log("search query:", search);
    let searchData;
    const searchQuery = search;
    // useEffect(() => {
    // fetch(`/api/search?${searchQuery}`)
    setTimeout(() => {
      fetch(`/api/search?query=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          // Handle the JSON data from the response here
          console.log("togglespin called right after dataa:", imgSpin);
          props.setRecipeData(data);
          console.log("setRecipeData called with data:", data);
          // Delay the stopping of the spinning animation
          setTimeout(() => {
            setImgSpin(false); // Stop spinning after a delay
          }, 6000);
        })
        .catch((error) => {
          // Handle the error, possibly by logging or displaying an error message.
          console.error("Fetch error:", error);
          toggleSpin();
        });
    }, 1000); // 6000 milliseconds (6 seconds) to match your CSS transition duration

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
