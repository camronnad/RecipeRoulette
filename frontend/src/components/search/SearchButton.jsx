import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
function SearchButton(props) {
  //'/api/search?query=${searchQuery}'

  return (
    <div className='searchButton'>
      <button className='bttn' onClick={props.clickHandler} height="30px" width="70px" >
        {props.label}
      </button>
    </div>
  );
}

export default SearchButton;