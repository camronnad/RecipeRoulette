import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import RecipeItem from "./RecipeItem";
import RecipeCardList from "./RecipeCardList";
import { Card, CardContent, Typography } from "@mui/material";
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram'; // Import Instagram icon
import StarIcon from '@mui/icons-material/Star';



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


  console.log("props:", props);
  //const { title, description, apiData } = props;
  // console.log("Received props:", props);
  // //const [likedModal, setLikedModal] = useState();
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
        // Handle the JSON data from the response here
        setLikedRecipeData(data);
      })
      .catch((error) => {
        // Handle and log the error
        console.error('Fetch error:', error);
      });
  }, []); // The empty dependency array ensures this effect runs only once, similar to componentDidMount
  //This way, the network request will be triggered when the component mounts (similar to componentDidMount in class components) and will not cause issues with component rendering. Wrapping it in a useEffect is the recommended approach for making asynchronous requests in functional components.


  const handleInstagramShare = () => {
    // Construct the Instagram share URL
    const instagramUrl = 'https://www.instagram.com'; // Replace with your Instagram URL

    // Open a new window with the Instagram share URL
    window.open(instagramUrl, '_blank');
  };


  const shareUrls = {
    facebook: 'https://www.facebook.com',
    twitter: 'https://www.twitter.com',
    instagram: 'https://www.instagram.com'
  };
  // handle delete function 
  // dont forget to prevent sql injection!
  const handleDeleteRecipe = (recipeId) => {
    const deleteURL = `http://localhost:3000/api/liked-recipes/${recipeId}`;
    console.log(`Sending DELETE request to: ${deleteURL}`);
    console.log("Deleting recipe with ID:", recipeId); // Add this line for debugging

    fetch(`/api/liked-recipes/${recipeId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 204) {
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

    // Filter out the recipe with the given ID from the likedRecipeData
    const updatedLikedRecipeData = likedRecipeData.filter(recipe => recipe.id !== recipeId);
    setLikedRecipeData(updatedLikedRecipeData);
  };

  const handleRateRecipe = (recipeId, rating) => {
    // Create a PUT request to update the rating
    const putURL = `http://localhost:3000/api/liked-recipes/rate/${recipeId}`;
    console.log(`Sending PUT request to: ${recipeId}`);
    console.log("put recipe with ID:", recipeId); // Add this line
    fetch(`/api/liked-recipes/rate/${recipeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating }),
    })
      .then((response) => {
        if (response.status === 200) {
          // If the update was successful, update the state with the new rating
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
                    <img src="mushroomPasta.png" alt="mushroom pasta" style={{
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
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                    {recipe.description}
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
                        {/* <span style={{ fontSize: "12px" }}><a
                          href="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL_HERE"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Share on Facebook
                        </a></span> */}

                        <span><h3>Share </h3></span>
                        <div>
                          <FacebookShareButton url={shareUrls.facebook} quote="Check out Facebook">
                            <FacebookIcon />
                          </FacebookShareButton>
                          <TwitterShareButton url={shareUrls.twitter} title="Check out Twitter">
                            <TwitterIcon />
                            {/* need recipe id as well below const url! */}
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