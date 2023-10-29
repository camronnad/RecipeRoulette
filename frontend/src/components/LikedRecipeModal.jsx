import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function LikedRecipeModal({ photo, RecipeName }) {
  return (
    <Card className="recipe-details-modal" sx={{ maxWidth: 1000, borderRadius: 5, position: 'relative', height: 1000 }}>
      <Box sx={{ position: 'absolute', right: -2, bottom: 170, p: 1 }}>
      </Box>
      <CardMedia
        component="img"
        height="194"
        src={photo}
        alt="Recipe Image"
      />
      <Box sx={{ height: '35px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {RecipeName}
        </Typography>
      </Box>

    </Card>
  );
}