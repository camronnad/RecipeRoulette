
import SearchBar from "./SearchBar";
import "../../styles/Search.css";

function SearchContainer(props) {
  return (
    <div className="wrapper">

      <SearchBar
        label="SPIN"
        setRecipeData={props.setRecipeData}
        setImgSpin={props.setImgSpin}
        imgSpin={props.imgSpin}
      />
    </div>
  );
}

export default SearchContainer;
