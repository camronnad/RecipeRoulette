import React from 'react';
import { AppBar } from '@mui/material';
import { Link } from 'react-router-dom'; 
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { useLocation } from 'react-router-dom';

import RecipeRouLogo from './RecipeRouLogo'; 
import UserProfile from './Profile'; 



const NavigationBar = ({ onLogout, isLoggedIn }) => {

  const location = useLocation();
  
  let appBarStyle;

if (location.pathname === "/likedrecipes") {
    appBarStyle = {
        backgroundImage: 'url("/SomeOtherImageForLikedRecipes.png")', // Replace with the path to your image specific for LikedRecipe page
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };
} else {
    appBarStyle = {
        backgroundImage: 'url("/HomeRouteImgcopy.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };
}

 
  return (
    <AppBar position="static" sx={{...appBarStyle}}>
      <Container maxWidth="xl">
      <Toolbar disableGutters sx={{ height: '100px' }}>
      <div>
        <img src="RecipeRouletteLogo.png" className="logo" alt="Recipe Roulette Logo"  style={{ height: '90px', marginLeft: "200px"}}/>
        </div>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
         
          </Typography>
          <Box sx={{ marginRight: 2 }}>
            <Link to="/preferences" style={{ color: 'white', textDecoration: 'none' }}>
              Preferences
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <UserProfile onLogout={onLogout} isLoggedIn={isLoggedIn} />
         
        </Toolbar>
      </Container>
      </AppBar>
  );
};


export default NavigationBar;
