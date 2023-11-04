import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import RecipeItem from "./RecipeItem";
import { Card } from "@mui/material";
import RecipeModal from "./RecipeModal";
import axios from 'axios';
import FavIcon from "./FavIcon";


const RecipeItemGrid = ({ handleCardClick, activeModal, recipeData, imgSpin }) => {
  // Get random recipes
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [modalFav, setModalFav] = useState(false);
  const [selectedColor, setSelectedColor] = useState(true);
  const [extendedIngredients, setExtendedIngredients] = useState([]);

  // const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => {
    setModalOpen(false);
  };

  const [likedItems, setLikedItems] = useState([]);
  // const handleCardClick = (RecipeName, photo,) => {
  //   if (activeModal === null) {
  //     setActiveModal(RecipeName);
  //   }
  // };

  useEffect(() => {
    axios.get("/api/liked-recipes")
      .then(res => {
        console.log({ res });
        setLikedItems(
          res.data.map
            (item =>
              item.recipe_id
            ));
      })
      .catch(err => {
        console.log({ err });
      });
  }, []);

  const handleFavClick = (isLiked, recipe) => {
    console.log("selected recipe.id", recipe.id);
    console.log(isLiked);
    if (isLiked) {
      axios.post('/api/saveLikeRecipe', {
        title: recipe.title,
        photo: recipe.image,
        recipeId: recipe.id,
        recipe_link: recipe.spoonacularSourceUrl,
        summary: recipe.summary,
        instructions: recipe.instructions,
        readyInMinutes: recipe.readyInMinutes
      })
        .then(response => {
          setLikedItems(prev => ([...prev, recipe.id]));
          console.log("response for isliked", response);
          if (response.data.message) {
            console.log("Recipe saved to liked recipes!");
          } else {
            console.error("Failed to save liked recipe:", response.data.error);
          }
        })
        .catch(error => {
          console.error("Error making the API call:", error);
        });

    } else {
      axios.delete(`http://localhost:8080/api/saveLikeRecipe/${recipe.id}`)
        .then(() => {
          console.log("Recipe removed from favorites!");
          setLikedItems(likedItems.filter(id => id !== recipe.id));

        })
        .catch(error => {
          console.error("Error removing the recipe:", error);
        });
    }

  };
  // const handleModalFav = () => {
  //   setModalFav(!modalFav);
  //   handleFavClick(modalFav, selectedRecipe);
  // };
  const toggleLiked = (recipe) => {
    setLikedItems(prev => {
      if (prev.includes(recipe.id)) {
        handleFavClick(false, recipe);
        return prev.filter(id => id !== recipe.id);
      } else {
        handleFavClick(true, recipe);
        return [...prev, recipe.id];
      }
    });
  };

  // console.log("recipe data:", recipeData);
  return (
    <>
      <Card
        sx={{ width: "750px", padding: 3, margin: 3, borderRadius: 9 }}
        className="recipe_grid"
      >
        {!imgSpin &&
          <Grid container spacing={3} justifyContent="center">
            {recipeData.map((recipe, index) => (
              <Grid key={index} item xs={4}>
                <RecipeItem
                  likedItems={likedItems}
                  handleFavClick={(isLiked) => { handleFavClick(isLiked, recipe); }}
                  selectedColor={selectedColor}
                  selectedRecipe={selectedRecipe}
                  setSelectedRecipe={setSelectedRecipe}
                  setModalOpen={setModalOpen}
                  photo={recipe.image}
                  RecipeName={recipe.title}
                  handleCardClick={handleCardClick}
                  activeModal={activeModal}
                  recipeId={recipe.id}
                  recipe={recipe}
                  recipe_link={recipe.spoonacularSourceUrl}
                  summary={recipe.summary}
                  toggleLiked={toggleLiked}
                />
              </Grid>
            ))}
          </Grid>
        }
      </Card >

      <RecipeModal isOpen={isModalOpen} >
        <div className="modal-container">
          <button className="modal-close-btn" onClick={closeModal}>×</button>
          <h2 className="modal-title">Recipe Name: {selectedRecipe.title}</h2>
          <img className="modal-img" src={selectedRecipe.image} alt="Recipe Image" />
          <div onClick={() => toggleLiked(selectedRecipe)}> <FavIcon selected={likedItems.includes(selectedRecipe.id)} /></div>
          <p className="modal-description">Here, you can provide a detailed description of your recipe or any other relevant info you want to share.</p>
          <p>Ready In Minutes: {selectedRecipe.readyInMinutes}</p>
          <p> INGREDIENTS:  {selectedRecipe.extendedIngredients && selectedRecipe.extendedIngredients.map(ingredient => {

            return <div>
              {/* <img src="https://spoonacular.com/cdn/ingredients_100x100/{ingredient.image}" /> */}
              <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}></img>
              <p>{ingredient.original}</p>
            </div>;
          })} </p>
          <br />
          <h3>INSTRUCTIONS</h3>
          <p>{selectedRecipe.analyzedInstructions && selectedRecipe.analyzedInstructions.map(instruction => {
            { console.log("instruction loop", instruction); }
            return (
              <div>
                {instruction.steps.map((step, index) => (
                  <div key={step.number}>
                    <li>{step.step}</li>
                    {index < instruction.steps.length - 1 && <br />}
                  </div>
                ))}
              </div>
            );
          })}
          </p>
          {/* <>Instructions: <br /> {selectedRecipe.instructions}</> */}
        </div>
      </RecipeModal>
    </>
  );
};

export default RecipeItemGrid;
