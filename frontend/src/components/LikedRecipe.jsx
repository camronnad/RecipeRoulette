import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import RecipeItem from "./RecipeItem";
import RecipeCardList from "./RecipeCardList";
import { Card, CardContent, Typography } from "@mui/material";
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import StarIcon from '@mui/icons-material/Star';
import LikedRecipeModal from "./LikedRecipeModal";
import TextField from "@mui/material/TextField";
import Axios from 'axios';
import SimilarRecipesCard from "./SimilarRecipesCard";
import ReactCardFlip from 'react-card-flip';
import Drawer from "@mui/material/Drawer";
import { Button } from "@mui/material";


// const mockData = [
//   {
//     id: 1,
//     imgSrc: "mushroomPasta.png",
//     name: "Mushroom Pasta",
//     description: "Delicious mushroom pasta with creamy sauce.",
//   }
//   // Add more recipe objects as needed
// ];

const LikedRecipe = (props) => {
  const { openLikedModal, closeLikedModal, photo } = props;
  const [likedModalOpen, setLikedModalOpen] = useState(false);
  const [likedRecipeData, setLikedRecipeData] = useState([]);
  const [selectedLikedRecipe, setSelectedLikedRecipe] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [recipeModalOpen, setRecipeModalOpen] = useState(false);
  const [showSimilarRecipes, setShowSimilarRecipes] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Add this state variable
  const [drawerOpen, setDrawerOpen] = useState(false);

  // const openRecipeDetails = (recipe) => {
  //   setSelectedRecipe(recipe); // Set the selected recipe when it's opened
  // };

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const openSimilarRecipesModal = () => {
    setShowSimilarRecipes(true);

  };

  const closeSimilarRecipesModal = () => {
    setShowSimilarRecipes(false);
  };


  console.log("isFlipped value before click", isFlipped);



  const closeModal = () => {
    setLikedModalOpen(false);
  };



  // const similarRecipesContainerStyle = {
  //   height: "300px",
  //   padding: 2,
  //   margin: 20,
  //   borderRadius: 10,
  //   backgroundColor: "rgba(255, 255, 255, 0.5)",
  //   transition: "height 0.5s",
  // };

  const fetchSimilarRecipesFromBackend = (recipeId) => {
    console.log("recipe id in api function", recipeId);
    Axios.get(`/api/liked-recipes/similar/${recipeId}`)
      .then((response) => {
        // Handle the response data here
        const apiRecipes = response.data;
        console.log('api recipes:', apiRecipes);
        setSimilarRecipes([...similarRecipes, apiRecipes]); // Set the similar recipes in the state
        console.log("simlar recipes stores from api", similarRecipes);
      })
      .catch((error) => {
        console.error('Error fetching similar recipes from backend:', error);
      });
  };

  useEffect(() => {
    console.log("document.body.style", document.body.style.overflow);
    document.body.style["overflow"] = "scroll";

    fetch(`/api/liked-recipes?userId=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setLikedRecipeData(data);
        console.log("data object:", data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  const handleInstagramShare = () => {
    const instagramUrl = 'https://www.instagram.com';
    window.open(instagramUrl, '_blank');
  };

  const shareUrls = {
    facebook: 'https://www.facebook.com',
    twitter: 'https://www.twitter.com',
    instagram: 'https://www.instagram.com'
  };

  const handleDeleteRecipe = (recipeId) => {
    const deleteURL = `http://localhost:3000/api/liked-recipes/${recipeId}`;
    console.log(`Sending DELETE request to: ${deleteURL}`);
    console.log("Deleting recipe with ID:", recipeId);

    fetch(`/api/liked-recipes/${recipeId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 204) {
          console.log("this is response data", response);
          // If the deletion was successful, update the state to remove the recipe
          const updatedLikedRecipeData = likedRecipeData.filter(recipe => recipe.id !== recipeId);
          setLikedRecipeData(updatedLikedRecipeData);
        } else {
          console.error('Failed to delete recipe');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
    const updatedLikedRecipeData = likedRecipeData.filter(recipe => recipe.id !== recipeId);
    setLikedRecipeData(updatedLikedRecipeData);
  };
  const userId = localStorage.getItem("userId");

  const handleRateRecipe = (recipeId, rating) => {
    const putURL = `http://localhost:3000/api/liked-recipes/rate/${recipeId}`;
    console.log(`Sending PUT request to: ${recipeId}`);
    console.log("Updating rating for recipe ID:", recipeId, "with rating:", rating);
    fetch(`/api/liked-recipes/rate/${recipeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating, userId }),
    })
      .then((response) => {
        if (response.status === 200) {
          const updatedLikedRecipeData = likedRecipeData.map(recipe => {
            if (recipe.id === recipeId) {
              return { ...recipe, rating };
            }
            return recipe;
          });
          setLikedRecipeData(updatedLikedRecipeData);
        } else {
          console.error('Failed to update rating');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  };
  const clickHandler = (recipe) => {
    console.log("handler clicked");

    console.log("recipe data outside handler", recipe);


    setSelectedLikedRecipe([recipe]);
    console.log("recipe data inside handler", recipe);
    setLikedModalOpen(true);
  };


  const parentStyle = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    minHeight: '100vh',
    display: 'grid', // This creates columns that grow to fit the container., // This sets the gap between the grid items.
    padding: '20px',
  };

  const cardStyle = {
    height: 200,
    padding: 2,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)"
  };

  const innerCardStyle = {
    padding: 2,
    borderRadius: 9,
    boxShadow: 3,
    margin: "20px auto",
    width: "100%",
    height: "150px",
  };

  const imageContainerStyle = {
    height: "75px",
    overflow: "hidden"
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  };
  const filteredLikedRecipeData = likedRecipeData.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );




  return (
    <>
      <div>
        <TextField
          label="Search Recipes"
          variant="outlined"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <Button variant="contained" onClick={openDrawer} style={{ float: "right" }}>
          Open Drawer
        </Button>
        <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
          <div>
            <SimilarRecipesCard
              similarRecipes={similarRecipes}
              isFlipped={isFlipped}
              setIsFlipped={setIsFlipped}

            />
          </div>
        </Drawer>
        {console.log("recipe data need recipe id", filteredLikedRecipeData)}
        {/* {likedRecipeData.map((recipe) => ( */}
        {filteredLikedRecipeData.map((recipe) => (
          <Card key={recipe.id} style={cardStyle}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={2}>
                <Card style={innerCardStyle}>
                  <CardContent>
                    <div onClick={() => clickHandler(recipe)} style={{ height: "75px", overflow: "hidden" }}>
                      <img src={recipe.photo_url} alt={recipe.photo_url} style={imageStyle} />
                    </div>

                    <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
                      {recipe.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card style={innerCardStyle}>
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
                      Description
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", maxHeight: "100px", overflowY: "auto" }}>
                      {recipe.summary.replace(/<[^>]+>/g, '')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card style={innerCardStyle}>
                  <CardContent>

                    <Grid container spacing={0} justifyContent="center" >
                      {/* ...other Grid items... */}
                      <Grid item xs={10} sx={{ mt: -5 }}>
                        <Card style={innerCardStyle}>
                          <CardContent>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              {/* Rating at the top */}
                              <div style={{ marginBottom: '10px' }}>
                                <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
                                  Rating
                                </Typography>
                                <div style={{ display: "flex", justifyContent: "center", padding: '10px 0' }}>
                                  {[1, 2, 3, 4, 5].map((rating) => (
                                    <div key={rating} onClick={() => handleRateRecipe(recipe.id, rating)} style={{ cursor: "pointer" }}>
                                      <StarIcon style={{ color: recipe.rating >= rating ? "gold" : "gray" }} />
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Delete and Share buttons side by side */}
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button
                                  onClick={() => handleDeleteRecipe(recipe.id)}
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                >
                                  DELETE
                                </button>
                                {/* Sharing options */}
                                <div onClick={() => fetchSimilarRecipesFromBackend(recipe.recipe_id)}>
                                  <button>Find Simlar Recipes</button>
                                </div>
                                <div>
                                  <FacebookShareButton url={recipe.recipe_link} quote={`check it out`}>
                                    <FacebookIcon size={32} round />
                                  </FacebookShareButton>
                                  <TwitterShareButton url={recipe.recipe_link} title="Check out Twitter">
                                    <TwitterIcon size={32} round />
                                  </TwitterShareButton>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Grid>

                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Card>
        ))}
      </div>


      <LikedRecipeModal likedModalOpen={likedModalOpen} selectedLikedRecipe={selectedLikedRecipe} setIsFlipped={setIsFlipped} >
        {console.log("liked recipe data inside modal", selectedLikedRecipe)}
        {selectedLikedRecipe.map((modalRecipeData) => (
          <div className="modal-container" key={modalRecipeData.id}>
            <button className="modal-close-btn" onClick={closeModal}>×</button>
            <h2 className="modal-title">Recipe Name: {modalRecipeData.title}</h2>
            <img className="modal-img" src={modalRecipeData.photo_url} alt="Recipe Image" />
            <p className="modal-description">Here, you can provide a detailed description of your recipe or any other relevant info you want to share.</p>
            <p>Ready In Minutes: {modalRecipeData.readyinminutes}</p>
            <p>{modalRecipeData.instructions.replace(/<[^>]+>/g, '')}</p>
            <p> INGREDIENTS:  {modalRecipeData.ingredients && modalRecipeData.ingredients.map(ingredient => {

              return <div>
                <ol>
                  <li>{ingredient}</li>
                </ol>
              </div>;
            })}
            </p>
          </div>
        ))}
      </LikedRecipeModal>
    </>
  );
};
export default LikedRecipe;

