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
  const { openLikedModal, closeLikedModal, photo, recipe } = props;


  console.log("props:", props);
  //const { title, description, apiData } = props;
  // console.log("Received props:", props);
  // //const [likedModal, setLikedModal] = useState();
  const [likedRecipeData, setLikedRecipeData] = useState([]);

  useEffect(() => {
    console.log("document.body.style", document.body.style.overflow)
    document.body.style["overflow"] = "scroll"
  
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
        console.log("data object:",data)
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

  return (
    <div style={parentStyle}>
      {likedRecipeData.map((recipe) => (
        <Card key={recipe.id} style={cardStyle}>
          <Grid container spacing={0} justifyContent="center">
            <Grid item xs={2}>
              <Card style={innerCardStyle}>
                <CardContent>
                  <div onClick={openLikedModal} style={{ height: "75px", overflow: "hidden" }}>
                    <img src={recipe.photo_url} alt={recipe.photo_url} style={imageStyle} />
                  </div>
                  <div>
                    
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
                    {console.log("Summary:", recipe)}
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
        <div style={{ display: 'flex', flexDirection: 'column'}}>
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
  );
                          }
  export default LikedRecipe;
              