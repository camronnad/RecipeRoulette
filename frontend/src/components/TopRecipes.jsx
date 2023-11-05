import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Card, CardContent, CardActions, CardMedia, Button, Typography } from "@mui/material";
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram'; // Import Instagram icon
import StarIcon from '@mui/icons-material/Star';
import LikedRecipeModal from "./LikedRecipeModal";


// const mockData = [
//   {
//     id: 1,
//     imgSrc: "mushroomPasta.png",
//     name: "Mushroom Pasta",
//     description: "Delicious mushroom pasta with creamy sauce.",
//   }
//   // Add more recipe objects as needed
// ];

const TopRecipes = (props) => {
  const { openLikedModal, closeLikedModal, photo } = props;
  const [likedModalOpen, setLikedModalOpen] = useState(false);
  const [likedRecipeData, setLikedRecipeData] = useState([]);
  const [selectedLikedRecipe, setSelectedLikedRecipe] = useState([]);

  const closeModal = () => {
    setLikedModalOpen(false);
  };

  console.log("props:", props);
  //const { title, description, apiData } = props;
  // console.log("Received props:", props);
  // //const [likedModal, setLikedModal] = useState();

  useEffect(() => {
    fetch(`/api/top-recipes`)
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



  const clickHandler = (recipe) => {
    console.log("handler clicked");

    console.log("recipe data outside handler", recipe);

    setSelectedLikedRecipe([recipe]);
    console.log("recipe data inside handler", recipe);
    setLikedModalOpen(true);
  };
  return (
    <>
      <div className="top-recipes">


        {console.log("likedRecipedata before map", likedRecipeData)}
        {/* <Grid container spacing={2} justifyContent="center"> */}
        <Grid container spacing={2} >

          {likedRecipeData.map((recipe) => (
            <Grid item lg={4} key={recipe.id}>
              {/* // <Grid item xs={6} sm={4} md={3} lg={2} key={recipe.id}>
            // <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
            // <Grid item xs={12} sm={6} md={4} lg={2} key={recipe.id}> */}

              <Card sx={{
                maxWidth: 345,
                border: '1px solid black',
                width: "100%", // Set the width to 100% to make all cards the same width
                height: "100%" // Set the height to 100% to make all cards the same height
              }}
                key={recipe.id}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={recipe.recipe_photo_url}
                  title={recipe.recipe_title}
                />
                <CardContent sx={{
                  height: "100%",
                  overflow: "auto",
                  padding: 0, // Remove padding
                  margin: 0, // Remove margin
                }}>
                  <Typography gutterBottom variant="h5" component="div" sx={{
                    marginBottom: '10px',
                    whiteSpace: 'nowrap', // Prevent text from wrapping to the next line
                    overflow: 'hidden',  // Hide overflowing text
                    textOverflow: 'ellipsis', // Show ellipsis (...) for overflow
                  }}
                  >
                    {recipe.recipe_title}
                  </Typography>
                  <Button sx={{ marginBottom: '20px' }} size="small" onClick={() => clickHandler(recipe)}>
                    <span style={{ fontSize: "16px" }}>Learn More</span>
                  </Button>

                  <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '10px' }}>
                    <div style={{ backgroundColor: "lightcoral", height: "50px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span>
                        <InstagramIcon fontSize="large" />
                        <FacebookShareButton url={recipe.recipe_recipe_link} quote={`check it out`}>
                          <FacebookIcon fontSize="large" />
                        </FacebookShareButton >
                        <TwitterShareButton url={recipe.recipe_recipe_link} title="Check out Twitter">
                          <TwitterIcon fontSize="large" />
                        </TwitterShareButton>
                      </span>
                      <div style={{ display: "flex", flexDirection: "row" }}>

                        <div key={recipe.recipe_id}>
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <StarIcon key={rating} style={{ color: recipe.recipe_rating >= rating ? "gold" : "gray" }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div" fontSize={14} marginBottom={-2}>
                    Rated By: {recipe.user_name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

        </Grid>
      </div >

      <LikedRecipeModal likedModalOpen={likedModalOpen} selectedLikedRecipe={selectedLikedRecipe} >
        {console.log("liked recipe data inside modal", selectedLikedRecipe)}
        {selectedLikedRecipe.map((modalRecipeData) => (
          <div className="modal-container" key={modalRecipeData.id}>
            <button className="modal-close-btn" onClick={closeModal}>×</button>
            <h2 className="modal-title">Recipe Name: {modalRecipeData.recipe_title}</h2>
            <img className="modal-img" src={modalRecipeData.recipe_photo_url} alt="Recipe Image" />
            <p className="modal-description">Here, you can provide a detailed description of your recipe or any other relevant info you want to share.</p>
            <p>Ready In Minutes: {modalRecipeData.recipe_readyinminutes}</p>
            <>Instructions: <br /> {modalRecipeData.recipe_instructions.replace(/<[^>]+>/g, '')}</>
          </div>
        ))}
      </LikedRecipeModal>
    </>
  );
};

export default TopRecipes;
