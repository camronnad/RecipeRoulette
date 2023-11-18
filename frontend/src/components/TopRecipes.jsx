import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import StarIcon from "@mui/icons-material/Star";
import LikedRecipeModal from "./LikedRecipeModal";
import "../styles/TopRecipes.scss";

const TopRecipes = (props) => {
  const { openLikedModal, closeLikedModal, photo } = props;
  const [likedModalOpen, setLikedModalOpen] = useState(false);
  const [likedRecipeData, setLikedRecipeData] = useState([]);
  const [selectedLikedRecipe, setSelectedLikedRecipe] = useState([]);

  const closeModal = () => {
    setLikedModalOpen(false);
  };

  useEffect(() => {
    fetch(`/api/top-recipes`)
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
        console.error("Fetch error:", error);
      });
  }, []);

  const handleInstagramShare = () => {
    const instagramUrl = "https://www.instagram.com";
    window.open(instagramUrl, "_blank");
  };

  const shareUrls = {
    facebook: "https://www.facebook.com",
    twitter: "https://www.twitter.com",
    instagram: "https://www.instagram.com",
  };

  const clickHandler = (recipe) => {
    setSelectedLikedRecipe([recipe]);
    setLikedModalOpen(true);
  };
  return (
    <>
      <div className="top-recipes">
        <div>
          <img src="TopRatedRecipes.png" className="top-recipes-title " />
        </div>

        <Grid container spacing={7} className="top-recipes-grid">
          {likedRecipeData.map((recipe) => (
            <Grid item lg={2} key={recipe.id}>
              <Card
                sx={{
                  maxWidth: 300,
                  border: "0px solid black",
                  width: "100%",
                  height: "100%",
                  boxShadow: "0px 4px 8px rgba(10, 21, 50, 0.5)",
                }}
                key={recipe.id}
              >
                <CardMedia
                  sx={{ height: 150 }}
                  image={recipe.recipe_photo_url}
                  title={recipe.recipe_title}
                />
                <CardContent
                  sx={{
                    height: "100%",
                    overflow: "auto",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      marginBottom: "2px",
                      marginLeft: "5px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontWeight: "bold",
                    }}
                  >
                    {recipe.recipe_title}
                  </Typography>
                  <Button
                    sx={{ marginBottom: "10px" }}
                    size="small"
                    onClick={() => clickHandler(recipe)}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        position: "relative",
                        left: "42%",
                      }}
                    >
                      Learn More
                    </span>
                  </Button>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: "10px" }}
                  >
                    <div
                      style={{
                        backgroundColor: "black",
                        height: "50px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <InstagramIcon
                          fontSize="medium"
                          style={{ color: "white", marginLeft: "15px" }}
                        />
                        <FacebookShareButton
                          url={recipe.recipe_recipe_link}
                          quote={`check it out`}
                        >
                          <FacebookIcon
                            fontSize="medium"
                            style={{ color: "white" }}
                          />
                        </FacebookShareButton>
                        <TwitterShareButton
                          url={recipe.recipe_recipe_link}
                          title="Check out Twitter"
                        >
                          <TwitterIcon
                            fontSize="medium"
                            style={{ color: "white" }}
                          />
                        </TwitterShareButton>
                      </span>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div key={recipe.recipe_id}>
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <StarIcon
                              key={rating}
                              style={{
                                color:
                                  recipe.recipe_rating >= rating
                                    ? "gold"
                                    : "gray",
                                position: "relative",
                                right: "5%",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontSize={16}
                    marginBottom={-2}
                    marginLeft={4}
                  ></Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <LikedRecipeModal
        likedModalOpen={likedModalOpen}
        selectedLikedRecipe={selectedLikedRecipe}
      >
        {selectedLikedRecipe.map((modalRecipeData) => (
          <div className="modal-container" key={modalRecipeData.id}>
            <button className="modal-close-btn" onClick={closeModal}>
              ×
            </button>
            <h2 className="modal-title">
              Recipe Name: {modalRecipeData.recipe_title}
            </h2>
            <img
              className="modal-img"
              src={modalRecipeData.recipe_photo_url}
              alt="Recipe Image"
            />
            <p className="modal-description">
              Here, you can provide a detailed description of your recipe or any
              other relevant info you want to share.
            </p>
            <p>Ready In Minutes: {modalRecipeData.recipe_readyinminutes}</p>
            <>
              Instructions: <br />{" "}
              {modalRecipeData.recipe_instructions.replace(/<[^>]+>/g, "")}
            </>
          </div>
        ))}
      </LikedRecipeModal>
    </>
  );
};

export default TopRecipes;
