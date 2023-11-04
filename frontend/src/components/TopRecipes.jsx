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
      <div>
        {console.log("likedRecipedata before map", likedRecipeData)}
        {likedRecipeData.map((recipe) => (
          <Card key={recipe.id} sx={{ width: "auto", padding: 3, margin: "0 auto", borderRadius: 9 }}>
            {console.log("recipe inside of mapping", recipe)}

            <Grid container spacing={3} justifyContent="center" >
              <Grid item xs={3}>
                <Card sx={{ padding: 2, borderRadius: 9, boxShadow: 3, margin: "0 auto", width: "100%", height: "150px" }}>
                  <CardContent>
                    <div onClick={() => clickHandler(recipe)}>
                      <div style={{ height: "75px", overflow: "hidden" }} >
                        <img src={recipe.recipe_photo_url} alt={recipe.recipe_photo_url} style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain", // This ensures the image fills the container.
                          display: "block",
                        }} />
                      </div>
                    </div>
                    <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
                      {recipe.recipe_title}
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
                      {recipe.recipe_summary}
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
                        <div style={{ backgroundColor: "lightcoral", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: "12px" }}>RATING</span>
                          <div style={{ display: "flex", flexDirection: "row" }}>

                            <div key={recipe.recipe_id}>
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <StarIcon key={rating} style={{ color: recipe.recipe_rating >= rating ? "gold" : "gray" }} />
                              ))}
                            </div>
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
                            <FacebookShareButton url={recipe.recipe_recipe_link} quote={`check it out`}>
                              <FacebookIcon />
                            </FacebookShareButton>
                            <TwitterShareButton url={recipe.recipe_recipe_link} title="Check out Twitter">
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
      <LikedRecipeModal likedModalOpen={likedModalOpen} selectedLikedRecipe={selectedLikedRecipe} >
        {console.log("liked recipe data inside modal", selectedLikedRecipe)}
        {selectedLikedRecipe.map((modalRecipeData) => (
          <div className="modal-container" key={modalRecipeData.id}>
            <button className="modal-close-btn" onClick={closeModal}>×</button>
            <h2 className="modal-title">Recipe Name: {modalRecipeData.recipe_title}</h2>
            <img className="modal-img" src={modalRecipeData.recipe_photo_url} alt="Recipe Image" />
            <p className="modal-description">Here, you can provide a detailed description of your recipe or any other relevant info you want to share.</p>
            <p>Ready In Minutes: {modalRecipeData.recipe_readyinminutes}</p>
            <>Instructions: <br /> {modalRecipeData.recipe_instructions}</>
          </div>
        ))}
      </LikedRecipeModal>
    </>
  );
};

export default TopRecipes;
