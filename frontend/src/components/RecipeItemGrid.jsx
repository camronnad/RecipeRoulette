import * as React from 'react';
import Grid from '@mui/material/Grid';
import RecipeItem from './RecipeItem';
import { Card } from '@mui/material';


const RecipeItemGrid = () => {

    return (
        <Card sx={{ width: "50vw", padding: 3, margin: 3, borderRadius: 9 }}> 
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={4}>
                    <RecipeItem photo="mushroomPasta.png" RecipeName={"Mushroom Pasta"}/>
                </Grid>
                <Grid item xs={4}>
                    <RecipeItem photo="BuddhaBowl.png" RecipeName={"Buddha Bowl"}/>
                </Grid>
                <Grid item xs={4}>
                    <RecipeItem photo="ButterChicken.png" RecipeName={"Butter Chicken"}/>
                </Grid>
            </Grid>
        </Card>
    );
}

export default RecipeItemGrid;