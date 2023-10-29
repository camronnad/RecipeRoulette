import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
function SearchButton(props) {
  const searchHandler = () => {

    console.log("SearchButton: Animation started.");

    props.setImgSpin(true); // Start the spin animation

    const searchQuery = props.search;

    fetch(`/api/search?query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("API response data:", data); // Log the response data

        // Handle the JSON data from the response here
        // Introduce a delay before stopping the animation
        setTimeout(() => {
          props.setImgSpin(false); // Stop the spin animation
          console.log("SearchButton: Animation stopped after a delay.");
        }, 6000);
        // console.log(data);
        // props.setImgSpin(false); // Stop the spin animation
      })
      .catch(error => {
        // Handle the error, possibly by logging or displaying an error message.
        console.error('Fetch error:', error);
        props.setImgSpin(false); // Stop the spin animation
      });
  };
  return (
    <div className='searchButton'>
      <button className='bttn' onClick={searchHandler} height="30px" width="70px" >
        {props.label}
      </button>
    </div>
  );
}

export default SearchButton;