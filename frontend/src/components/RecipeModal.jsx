import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FavIcon from './FavIcon';


export default function RecipeModal({ recipeData }) {
 

  return (
    <Card className="recipe-details-modal" sx={{ maxWidth: 1000, borderRadius: 5, position: 'relative', height: 1000}}>
      <Box sx={{ position: 'absolute', right: -2, bottom: 170, p: 1 }}>
        <FavIcon />
      </Box>
      <CardMedia
        component="img"
        height="194"
        src={recipeData?.image}
        alt="Recipe Image"
      />
      <Box sx={{ height: '35px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {recipeData.title}
        </Typography>
      </Box>
    
    </Card>
  );
}
