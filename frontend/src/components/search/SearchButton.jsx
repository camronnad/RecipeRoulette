import React, { useEffect } from 'react';
import SearchBar from './SearchBar';

function SearchButton(props) {


  return (
    <div className="btn-card">
      <button className='bttn' onClick={props.clickHandler} >
        {props.label}
      </button>
    </div>
  );
}

export default SearchButton;
