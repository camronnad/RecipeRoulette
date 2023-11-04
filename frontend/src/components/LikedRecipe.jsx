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


const LikedRecipe = (props) => {
  const { openLikedModal, closeLikedModal, photo } = props;
  console.log("props:", props);
  const [likedRecipeData, setLikedRecipeData] = useState([]);

  useEffect(() => {
    fetch(`/api/liked-recipes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setLikedRecipeData(data);
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

  const handleRateRecipe = (recipeId, rating) => {
    const putURL = `http://localhost:3000/api/liked-recipes/rate/${recipeId}`;
    console.log(`Sending PUT request to: ${recipeId}`);
    console.log("Updating rating for recipe ID:", recipeId, "with rating:", rating);
    fetch(`/api/liked-recipes/rate/${recipeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating }),
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

  return (
    <div>
      {likedRecipeData.map((recipe) => (
        <Card key={recipe.id} sx={{ width: "auto", padding: 3, margin: "0 auto", borderRadius: 9 }}>
          <Grid container spacing={3} justifyContent="center" >
            <Grid item xs={3}>
              <Card sx={{ padding: 2, borderRadius: 9, boxShadow: 3, margin: "0 auto", width: "100%", height: "150px" }}>
                <CardContent>
                  <div onClick={openLikedModal} style={{ height: "75px", overflow: "hidden" }} >
                    <img src={recipe.photo_url} alt={recipe.photo_url} style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain", // This ensures the image fills the container.
                      display: "block",
                    }} />
                  </div>
                  <div>
                    <button onClick={closeLikedModal} >Close</button>
                  </div>
                  <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
                    {recipe.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ padding: 2, borderRadius: 9, boxShadow: 3, margin: "0 auto", width: "80%", height: "150px" }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
                    Description
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", maxHeight: "100px", overflowY: "auto" }}>
                    {recipe.summary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card sx={{
                padding: 2,
                borderRadius: 9,
                boxShadow: 3,
                margin: "0 auto",
                width: "100%",
                height: "150px"
              }}>
                <CardContent >
                  <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
                    Options
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                    Content goes here.
                  </Typography>
                  <Grid container spacing={2} justifyContent="center"> {/* Nest another Grid container */}
                    <Grid item xs={4}>
                      <div style={{ backgroundColor: "lightblue", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "12px" }}>
                          <button
                            onClick={() => handleDeleteRecipe(recipe.id)} // Pass the recipe ID to the delete handler
                            variant="contained"
                            color="secondary" // Change to your preferred color
                            size="small"
                          >
                            DELETE
                          </button></span>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div style={{ backgroundColor: "lightcoral", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "12px" }}>RATE</span>
                        <div style={{ display: "flex", flexDirection: "row" }}> {/* Add the display: "flex" here */}
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <div key={rating} onClick={() => handleRateRecipe(recipe.id, rating)} style={{ cursor: "pointer" }}>
                              <StarIcon style={{ color: recipe.rating >= rating ? "gold" : "gray" }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div style={{ backgroundColor: "lightgreen", height: "50px", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                        <span><h3>Share </h3></span>
                        <div>
                          <FacebookShareButton url={recipe.recipe_link} quote={`check it out`}>
                            <FacebookIcon />
                          </FacebookShareButton>
                          <TwitterShareButton url={recipe.recipe_link} title="Check out Twitter">
                            <TwitterIcon />
                          </TwitterShareButton>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Card>
      ))}
    </div>
  );
};

export default LikedRecipe;
