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
  
  // let appBarStyle = {};

// if (location.pathname === "/") {
//   appBarStyle.backgroundImage = 'url("/HomeRouteImg.png")';
  
//     } else if (location.pathname === '/Profile') { // Replace with the specific path you want
//       appBarStyle.backgroundImage = 'url("/HomeRouteImg.png")';
//     } else {
//       appBarStyle.backgroundImage = 'url("/BackDrop.png")';
//       appBarStyle.position = "relative"
//       appBarStyle.left = "20%"
//     }
//     appBarStyle.backgroundSize = 'cover';
//     appBarStyle.backgroundRepeat = 'no-repeat';
//     appBarStyle.backgroundColor = 'transparent';
//     appBarStyle.boxShadow = 'none';
  
//     console.log('App Bar Style: ', appBarStyle)
 


  return (
    <AppBar position="static" sx={{ backgroundColor: "transparent", boxShadow: "none", marginLeft: 2}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: '100px' }}>
          <div>
            <img src="RecipeRouletteLogo.png" className="logo" alt="Recipe Roulette Logo" style={{ height: '90px', marginLeft: "200px" }} />
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
          <Box sx={{ marginLeft: 'auto', marginRight: 1 }}>
    <Link to="/preferences" style={{ color: 'black', textDecoration: 'none' }}>
      Preferences
    </Link>
  </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }  }}>
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              
              
            >
              
            </IconButton> */}
          </Box>
          
          <UserProfile onLogout={onLogout} isLoggedIn={isLoggedIn} />

        </Toolbar>
      </Container>
    </AppBar>
  );
};


export default NavigationBar;
