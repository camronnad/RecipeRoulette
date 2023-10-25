import React from "react";
import Grid from "@mui/material/Grid";
import RecipeItem from "./RecipeItem";
import { Card, CardContent, Typography } from "@mui/material";

const mockData = [
  {
    id: 1,
    imgSrc: "mushroomPasta.png",
    name: "Mushroom Pasta",
    description: "Delicious mushroom pasta with creamy sauce.",
  }
  // Add more recipe objects as needed
];

const LikedRecipe = ({ handleCardClick, activeModal }) => {
  return (
    <Card sx={{ width: "auto", padding: 3, margin: "0 auto", borderRadius: 9 }}>
      <Grid container spacing={3} justifyContent="center" >
        <Grid item xs={3}>
          <Card sx={{ padding: 2, borderRadius: 9, boxShadow: 3, margin: "0 auto", width: "80%", height: "150px" }}>
            <CardContent>
              <img src={mockData[0].imgSrc} alt={mockData[0].name} style={{ maxWidth: "150px", maxHeight: "150px", display: "block" }} />

              <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
                {mockData[0].name}
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
                {mockData[0].description}
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
                    <span style={{ fontSize: "12px" }}>Delete</span>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div style={{ backgroundColor: "lightcoral", height: "50px", justifyContent: "center" }}>Rate</div>
                </Grid>
                <Grid item xs={4}>
                  <div style={{ backgroundColor: "lightgreen", height: "50px", justifyContent: "center" }}>Share</div>
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
