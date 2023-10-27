import React, { useState, useEffect } from 'react';
import SearchButton from './SearchButton';
import SearchContainer from './SearchContainer';
function SearchBar(props) {

  const [search, setSearch] = useState('');

  const inputChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const searchHandler = () => {
    //can use search query here for futher processing with sending data to server
    props.setImgSpin(true); // Start the spin animation

    // After a certain delay (e.g., 1000ms or 1 second), set imgSpin to false
    setTimeout(() => {
      props.setImgSpin(false);
    }, 1000); // Adjust the delay as needed
  };

  //console.log('search query:', search);
  //let searchData;
  const searchQuery = search;



  // searchHandler should be a hook and within use useEffect eg useSearchHandler

  return (
    <div className='searchBar'>
      <SearchButton setImgSpin={props.setImgSpin} label={props.label} clickHandler={searchHandler} search={search} />
      <div className='searchIconBar'>
        <input
          className='inputSize'
          type="text"
          placeholder="Type your search here and hit spin"
          value={search}
          onChange={inputChangeHandler}
        />
      </div>
    </div>
  );
}

export default SearchBar;