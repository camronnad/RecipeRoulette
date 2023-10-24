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
    //props.onClick();
    console.log('search query:', search);
    let searchData;
    const searchQuery = search;
    // useEffect(() => {
    // fetch(`/api/search?${searchQuery}`)
    fetch(`/api/search?query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the JSON data from the response here
        //searchData = data;
        console.log(data);
      })
      .catch(error => {
        // Handle the error, possibly by logging or displaying an error message.
        console.error('Fetch error:', error);
      });
    //console.log("searchData", searchData);
    // }, []);
    // searchHandler should be a hook and within use useEffect eg useSearchHandler
  };

  return (
    <div className='searchBar'>
      <SearchButton label={props.label} clickHandler={searchHandler} />
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