import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import RecipeItem from "./RecipeItem";
import RecipeCardList from "./RecipeCardList";
import { Card, CardContent, Typography } from "@mui/material";

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
  console.log("Received props:", props);

  //const [liedrecipeData, setLikedRecipeData] = useState([]);

  fetch(`/api/liked-recipes`)
    .then((response) => response.json())
    .then((data) => {
      // Handle the JSON data from the response here
      //searchData = data;
      console.log(data);
      //setLikedRecipeData(data);
    })
    .catch(error => {
      // Handle the error, possibly by logging or displaying an error message.
      console.error('Fetch error:', error);
    });


  return (
    <Card sx={{ width: "auto", padding: 3, margin: "0 auto", borderRadius: 9 }}>
      <Grid container spacing={3} justifyContent="center" >
        <Grid item xs={3}>
          <Card sx={{ padding: 2, borderRadius: 9, boxShadow: 3, margin: "0 auto", width: "100%", height: "150px" }}>
            <CardContent>
              <div style={{ height: "75px", overflow: "hidden" }}>
                <img src={props.imgSrc} alt={props.name} onClick={props.handleCardClick} style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain", // This ensures the image fills the container.
                  display: "block",
                }} />
              </div>
              <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
                {props.name}
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
                {props.description}
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
                    <span style={{ fontSize: "12px" }}>DELETE</span>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div style={{ backgroundColor: "lightcoral", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "12px" }}>RATE</span>

                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div style={{ backgroundColor: "lightgreen", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "12px" }}>SHARE</span>

                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
};

export default LikedRecipe;
