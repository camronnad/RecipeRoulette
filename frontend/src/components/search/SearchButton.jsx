import React from 'react';
import { FaDice, FaRandom, FaHeart, FaSave } from 'react-icons/fa';

function SearchButton(props) {
  return (
    <>
    <div className="btn-card">
      <h1>Spin the Culinary Wheel!</h1>
      <ul>
        <p><FaDice /> Click the button below to start the roulette.</p>
        <p><FaRandom /> We'll pick a random recipe for you.</p>
        <p><FaHeart /> If you like it, give it a heart! </p>
        <p>Save it for later and build your culinary collection.</p>
        <p>If not feeling it, just spin again!</p>
      </ul>
      <p className="btn-card-text">
        Go ahead, take a spin and spice up your meal plans!
      </p>
     

     

      <p className="hint-text">
        Not happy with the result? You can always take another spin!
      </p>

    </div>
     <button className='bttn' onClick={props.clickHandler}>
     {props.label}
   </button>
   </>
  );
}

export default SearchButton;
