import React from "react";
import { FaDice, FaRandom, FaHeart, FaSave } from "react-icons/fa";

function SearchButton(props) {
  return (
    <>
      <div className="btn-card">
        <ul>
          <p>
            <FaDice /> Click the button below to start the roulette.
          </p>
          <p>
            <FaRandom /> We'll pick a random recipe for you.
          </p>
          <p>
            <FaHeart /> If you like it, give it a heart!{" "}
          </p>
        </ul>
        <span className="btn-card-text">Go ahead, take a spin</span>
        <span className="btn-card-text">and spice up your meal plans!</span>
        <div>

        </div>
        <span className="hint-text">Not happy with the result?</span>
        <span className="hint-text">You can always take another spin!</span>
      </div>
      <div>
        <img src="NewArrow.png" className="arrow" />
      </div>
      <button className="bttn" onClick={props.clickHandler}>
        {props.label}
      </button>
    </>
  );
}

export default SearchButton;
