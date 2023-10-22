import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import FavIcon from './FavIcon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export default function RecipeItem({photo, RecipeName}) {
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    setShowModal(!showModal);
  };

  return (
    <Card className="Card-item" sx={{ maxWidth: 245, borderRadius: 5, position: 'relative',}} onClick={handleCardClick}>
      <Box sx={{ position: 'absolute', right: -2, bottom: 170, p: 1 }}>
        <FavIcon />
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

