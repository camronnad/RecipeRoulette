import React from 'react';
function SearchButton(props) {
  return (
    <div className="btn-card">
      <h2>Welcome to Recipe Roulette!</h2>
<ul>
  <li>Click the button below to start the roulette.</li>
  <li>We'll pick a random recipe for you.</li>
  <li>If you like it, awesome! If not, just spin again.</li>
</ul>
<p className="btn-card-text">Go ahead, take a spin and spice up your meal plans!</p>
      <button className='bttn' onClick={props.clickHandler} >
        {props.label}
      </button>
    </div>
  );
}

export default SearchButton;
