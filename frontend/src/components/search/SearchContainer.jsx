
import SearchBar from "./SearchBar";
import "../../Search.css";

function SearchContainer(props) {

  return (
    <div className="wrapper">

      <SearchBar
        label="SPIN"
        setRecipeData={props.setRecipeData}
      />
    </div>
  );
}

export default SearchContainer;
