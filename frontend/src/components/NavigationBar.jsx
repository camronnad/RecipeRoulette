import React from 'react';
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import RecipeRouLogo from './RecipeRouLogo'; 
import UserProfile from './Profile'; 

const NavigationBar = ({ onLogout, isLoggedIn }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#759e3b' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RecipeRouLogo />
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
            RecipeRoulette
          </Typography>
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
